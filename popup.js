// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const instanceInput = document.getElementById("instance-input");
const saveButton = document.getElementById("save")

async function set() {
    let instance = instanceInput.value.replace(/^https?:\/\//, "");
    await browser.storage.sync.set(
        { instance: instance }
    );
}

saveButton.addEventListener("click", async() => {
    saveButton.classList.add("loading");

    try {
        await set();
    } catch (e) {
        saveButton.classList.add("error");
        console.error(e);
        document.getElementById("errors").textContent = e;
    } finally {
        saveButton.classList.remove("loading");
    }
});

(async() => {
    const sync = await browser.storage.sync.get("instance");
    instanceInput.value = sync.instance;
})();

