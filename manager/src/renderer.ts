/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 */

import './index.less';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';


class ManagerApp {
	constructor() {
		
	}
}

declare const app: ManagerApp;
// @ts-ignore
globalThis.app = new ManagerApp();









// const app = document.querySelector<HTMLDivElement>('#app')!;

let sourceDir = '';
let gameDir = '';
let saves: SaveEntry[] = [];
let slots: SaveSlot[] = [];
let selected: SaveEntry | null = null;
/*
app.innerHTML = `
	<main class="shell">
		<header class="topbar">
			<div class="brand"><span class="triforce">▲</span><div><small>OOT REMAKE</small><strong>SAVE MANAGER</strong></div></div>
			<button class="settings" id="gameDirBtn" title="Choose game save directory">⚙</button>
		</header>

		<section class="game-strip">
			<div><span>GAME DIRECTORY</span><strong id="gamePath">Not selected</strong></div>
			<button id="chooseGame">CHOOSE DIRECTORY</button>
		</section>

		<section class="layout">
			<aside class="library">
				<div class="library-head">
					<div><small>SAVE LIBRARY</small><strong id="saveCount">0 ENTRIES</strong></div>
					<button id="chooseSource">SOURCE</button>
				</div>
				<label class="search"><span>⌕</span><input id="search" placeholder="Search saves..." /></label>
				<div class="save-list" id="saveList"><div class="empty"><b>No source selected</b><span>Choose the directory containing the save folders.</span></div></div>
			</aside>

			<article class="detail">
				<div id="detailEmpty" class="detail-empty"><div class="crest">▲</div><h2>SELECT A SAVE</h2><p>Choose an entry from the library to inspect it.</p></div>
				<div id="detailPanel" hidden></div>
			</article>

			<aside class="slots">
				<div class="section-title"><small>GAME SAVE</small><strong>FILE SLOTS</strong></div>
				<div id="slotList"></div>
			</aside>
		</section>
	</main>`;

const saveList = document.querySelector<HTMLDivElement>('#saveList')!;
const detailEmpty = document.querySelector<HTMLDivElement>('#detailEmpty')!;
const detailPanel = document.querySelector<HTMLDivElement>('#detailPanel')!;
const search = document.querySelector<HTMLInputElement>('#search')!;

function escapeHtml(value: string) {
	return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!);
}

function renderSaves() {
	const term = search.value.trim().toLowerCase();
	const filtered = saves.filter((save) => `${save.id} ${save.name} ${save.location}`.toLowerCase().includes(term));
	document.querySelector('#saveCount')!.textContent = `${filtered.length} ENTRIES`;
	if (!filtered.length) {
		saveList.innerHTML = '<div class="empty"><b>No saves found</b><span>Try another search or source folder.</span></div>';
		return;
	}
	saveList.innerHTML = filtered.map((save) => `
		<button class="save-row ${selected?.id === save.id ? 'active' : ''}" data-id="${escapeHtml(save.id)}">
			${save.image ? `<img src="file://${save.image.replace(/\\/g, '/')}" />` : '<div class="thumb-fallback">◆</div>'}
			<div><strong>${escapeHtml(save.name)}</strong><small>${escapeHtml(save.location || save.id)}</small></div>
			${save.hasProgress ? '<i>●</i>' : ''}
		</button>`).join('');

	saveList.querySelectorAll<HTMLButtonElement>('.save-row').forEach((button) => {
		button.onclick = () => selectSave(filtered.find((save) => save.id === button.dataset.id)!);
	});
}

async function selectSave(save: SaveEntry) {
	selected = save;
	renderSaves();
	detailEmpty.hidden = true;
	detailPanel.hidden = false;
	detailPanel.innerHTML = `
		<div class="detail-art">${save.image ? `<img src="file://${save.image.replace(/\\/g, '/')}" />` : '<div class="crest large">▲</div>'}</div>
		<div class="detail-copy">
			<small>${escapeHtml(save.id)}</small>
			<h1>${escapeHtml(save.name)}</h1>
			${save.location ? `<h3>${escapeHtml(save.location)}</h3>` : ''}
			<p>${escapeHtml(save.description || 'No additional description available.')}</p>
			<div class="file-badges"><span class="${save.hasProgress ? 'ok' : ''}">PROGRESS</span><span class="${save.hasCaption ? 'ok' : ''}">CAPTION</span></div>
			<button class="install-button" id="installBtn" ${!gameDir || !save.hasProgress ? 'disabled' : ''}>INSTALL TO SELECTED SLOT</button>
		</div>`;

	document.querySelector<HTMLButtonElement>('#installBtn')?.addEventListener('click', () => {
		const chosen = document.querySelector<HTMLInputElement>('input[name="slot"]:checked')?.value;
		if (chosen) installSave(chosen);
	});
}

async function refreshSlots() {
	if (!gameDir) {
		document.querySelector('#slotList')!.innerHTML = '<div class="slot-placeholder">Choose a game save directory.</div>';
		return;
	}
	slots = await window.saveManager.listSlots(gameDir);
	document.querySelector('#slotList')!.innerHTML = slots.map((slot, i) => `
		<label class="slot-card">
			<input type="radio" name="slot" value="${slot.id}" ${i === 0 ? 'checked' : ''} />
			<span class="slot-radio"></span>
			<span class="slot-number">${i + 1}</span>
			<span class="slot-info"><strong>${slot.id.toUpperCase().replace('_', ' ')}</strong><small>${slot.hasCaption && slot.hasProgress ? 'Save file present' : 'Empty slot'}</small></span>
		</label>`).join('');
}

async function chooseSource() {
	const result = await window.saveManager.chooseDirectory('Choose the root of the save library');
	if (!result) return;
	sourceDir = result;
	saves = await window.saveManager.listSaves(sourceDir);
	selected = null;
	detailPanel.hidden = true;
	detailEmpty.hidden = false;
	renderSaves();
}

async function chooseGame() {
	const result = await window.saveManager.chooseDirectory('Choose the game save directory');
	if (!result) return;
	gameDir = result;
	document.querySelector('#gamePath')!.textContent = gameDir;
	await refreshSlots();
	if (selected) selectSave(selected);
}

async function installSave(slotId: string) {
	if (!selected || !sourceDir || !gameDir) return;
	const button = document.querySelector<HTMLButtonElement>('#installBtn')!;
	button.disabled = true;
	button.textContent = 'INSTALLING...';
	try {
		await window.saveManager.installSave(sourceDir, selected.id, gameDir, slotId);
		button.textContent = 'INSTALLED';
		await refreshSlots();
	} catch (error) {
		button.textContent = 'INSTALL FAILED';
		console.error(error);
	}
}

document.querySelector('#chooseSource')!.addEventListener('click', chooseSource);
document.querySelector('#chooseGame')!.addEventListener('click', chooseGame);
document.querySelector('#gameDirBtn')!.addEventListener('click', chooseGame);
search.addEventListener('input', renderSaves);
refreshSlots();
//*/