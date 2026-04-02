(function () {
    function installPaletteModule() {
        const bridge = window.PixelForgePaletteBridge;
        if (!bridge) return false;

        const refs = bridge.refs;
        const constants = bridge.constants;
        const state = bridge.state;
        const helpers = bridge.helpers;

        function applyPaletteLayout() {
            const containers = [
                refs.colorFamiliesContainer,
                refs.savedPaletteContainer,
                refs.recentPaletteContainer
            ];

            containers.forEach((container) => {
                if (!container) return;

                container.style.display = "grid";
                container.style.gridTemplateColumns = `repeat(${constants.PALETTE_SPLIT_COLUMNS}, minmax(0, 1fr))`;
                container.style.gap = "6px";
                container.style.alignItems = "stretch";
            });
        }

        function hexToRgb(hex) {
            return {
                r: parseInt(hex.substring(1, 3), 16),
                g: parseInt(hex.substring(3, 5), 16),
                b: parseInt(hex.substring(5, 7), 16)
            };
        }

        function rgbToHex(r, g, b) {
            const toHex = (value) =>
                helpers.clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");

            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        function mixColors(colorA, colorB, amount) {
            const a = hexToRgb(colorA);
            const b = hexToRgb(colorB);

            const r = a.r + (b.r - a.r) * amount;
            const g = a.g + (b.g - a.g) * amount;
            const bValue = a.b + (b.b - a.b) * amount;

            return rgbToHex(r, g, bValue);
        }

        function drawShadeBar() {
            if (!refs.shadeBarCtx || !refs.shadeBarCanvas) return;

            const width = refs.shadeBarCanvas.width;
            const height = refs.shadeBarCanvas.height;

            refs.shadeBarCtx.clearRect(0, 0, width, height);

            const darkBase = mixColors(state.currentColor, "#000000", 0.9);
            const lightBase = mixColors(state.currentColor, "#ffffff", 0.75);

            const gradient = refs.shadeBarCtx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, darkBase);
            gradient.addColorStop(0.22, mixColors(state.currentColor, "#000000", 0.45));
            gradient.addColorStop(0.5, state.currentColor);
            gradient.addColorStop(0.78, mixColors(state.currentColor, "#ffffff", 0.4));
            gradient.addColorStop(1, lightBase);

            refs.shadeBarCtx.fillStyle = gradient;
            refs.shadeBarCtx.fillRect(0, 0, width, height);

            refs.shadeBarCtx.strokeStyle = "#555";
            refs.shadeBarCtx.lineWidth = 2;
            refs.shadeBarCtx.strokeRect(1, 1, width - 2, height - 2);

            const currentX = Math.round(width * 0.5);
            refs.shadeBarCtx.strokeStyle = "#ffffff";
            refs.shadeBarCtx.lineWidth = 2;
            refs.shadeBarCtx.beginPath();
            refs.shadeBarCtx.moveTo(currentX, 0);
            refs.shadeBarCtx.lineTo(currentX, height);
            refs.shadeBarCtx.stroke();
        }

        function getShadeBarColorAt(mouseX) {
            const width = refs.shadeBarCanvas.width;
            const ratio = helpers.clamp(mouseX / width, 0, 1);

            if (ratio < 0.5) {
                const localRatio = ratio / 0.5;
                const darkBase = mixColors(state.currentColor, "#000000", 0.9);
                return mixColors(darkBase, state.currentColor, localRatio);
            }

            const localRatio = (ratio - 0.5) / 0.5;
            const lightBase = mixColors(state.currentColor, "#ffffff", 0.75);
            return mixColors(state.currentColor, lightBase, localRatio);
        }

        function loadSavedPalette() {
            const stored = localStorage.getItem(constants.PALETTE_STORAGE_KEY);

            if (!stored) {
                state.savedPalette = new Array(constants.SAVED_PALETTE_SIZE).fill(null);
                return;
            }

            try {
                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    const nextPalette = new Array(constants.SAVED_PALETTE_SIZE).fill(null);

                    for (let i = 0; i < constants.SAVED_PALETTE_SIZE; i++) {
                        nextPalette[i] = helpers.normalizeColor(parsed[i] || null);
                    }

                    state.savedPalette = nextPalette;
                } else {
                    state.savedPalette = new Array(constants.SAVED_PALETTE_SIZE).fill(null);
                }
            } catch {
                state.savedPalette = new Array(constants.SAVED_PALETTE_SIZE).fill(null);
            }
        }

        function persistSavedPalette() {
            localStorage.setItem(constants.PALETTE_STORAGE_KEY, JSON.stringify(state.savedPalette));
        }

        function addColorToRecentPalette(color) {
            const normalized = helpers.normalizeColor(color);
            if (!normalized) return;

            const nextRecent = state.recentPalette.filter(entry => entry !== normalized);
            nextRecent.unshift(normalized);
            state.recentPalette = nextRecent.slice(0, constants.RECENT_PALETTE_SIZE);
        }

        function renderColorFamilies() {
            if (!refs.colorFamiliesContainer) return;

            refs.colorFamiliesContainer.innerHTML = "";

            for (const family of constants.COLOR_FAMILIES) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "colorSwatch familySwatch";
                button.style.background = family.color;
                button.title = family.name;
                button.dataset.color = family.color;

                if (helpers.normalizeColor(family.color) === state.currentColor) {
                    button.classList.add("selectedSwatch");
                }

                button.onclick = () => {
                    handleUIColorPick(family.color);
                };

                refs.colorFamiliesContainer.appendChild(button);
            }
        }

        function renderSavedPalette() {
            if (!refs.savedPaletteContainer) return;

            refs.savedPaletteContainer.innerHTML = "";

            for (let i = 0; i < constants.SAVED_PALETTE_SIZE; i++) {
                const color = state.savedPalette[i];
                const button = document.createElement("button");
                button.type = "button";
                button.className = "colorSwatch";

                if (!color) {
                    button.classList.add("emptySlot");
                    button.title = "Empty locked color slot";
                } else {
                    button.style.background = color;
                    button.title = `Locked color ${i + 1}`;
                    button.dataset.color = color;

                    if (color === state.currentColor) {
                        button.classList.add("selectedSwatch");
                    }

                    button.onclick = () => {
                        handleUIColorPick(color);
                    };

                    button.oncontextmenu = (event) => {
                        event.preventDefault();
                        const nextSaved = [...state.savedPalette];
                        nextSaved[i] = null;
                        state.savedPalette = nextSaved;
                        persistSavedPalette();
                        renderSavedPalette();
                    };
                }

                refs.savedPaletteContainer.appendChild(button);
            }
        }

        function renderRecentPalette() {
            if (!refs.recentPaletteContainer) return;

            refs.recentPaletteContainer.innerHTML = "";

            for (let i = 0; i < constants.RECENT_PALETTE_SIZE; i++) {
                const color = state.recentPalette[i] || null;
                const button = document.createElement("button");
                button.type = "button";
                button.className = "colorSwatch";

                if (!color) {
                    button.classList.add("emptySlot");
                    button.title = "Empty recent color slot";
                } else {
                    button.style.background = color;
                    button.title = `Recent color ${i + 1}`;
                    button.dataset.color = color;

                    if (color === state.currentColor) {
                        button.classList.add("selectedSwatch");
                    }

                    button.onclick = () => {
                        handleUIColorPick(color);
                    };
                }

                refs.recentPaletteContainer.appendChild(button);
            }
        }

        function setCurrentColor(color, options = {}) {
            const normalized = helpers.normalizeColor(color);
            if (!normalized) return;

            state.currentColor = normalized;
            refs.colorPicker.value = normalized;

            if (!options.skipRecent) {
                addColorToRecentPalette(normalized);
            }

            drawShadeBar();
            renderColorFamilies();
            renderSavedPalette();
            renderRecentPalette();
        }

        function handleUIColorPick(color) {
            setCurrentColor(color);

            if (state.currentTool === "eyedropper") {
                state.currentTool = "pencil";
                helpers.updateToolUI();
            }

            helpers.drawCanvas();
        }

        function addCurrentColorToPalette() {
            const normalized = helpers.normalizeColor(state.currentColor);
            if (!normalized) return;

            const working = [...state.savedPalette];
            const existingIndex = working.indexOf(normalized);

            if (existingIndex !== -1) {
                working.splice(existingIndex, 1);
                working.unshift(normalized);
                state.savedPalette = working.slice(0, constants.SAVED_PALETTE_SIZE);
            } else {
                const emptyIndex = working.indexOf(null);

                if (emptyIndex !== -1) {
                    working[emptyIndex] = normalized;
                } else {
                    working.pop();
                }

                const nextSaved = [normalized, ...working.filter((entry, index) => index !== emptyIndex)];
                state.savedPalette = nextSaved.slice(0, constants.SAVED_PALETTE_SIZE);
            }

            while (state.savedPalette.length < constants.SAVED_PALETTE_SIZE) {
                state.savedPalette.push(null);
            }

            persistSavedPalette();
            renderSavedPalette();
        }

        function clearSavedPalette() {
            state.savedPalette = new Array(constants.SAVED_PALETTE_SIZE).fill(null);
            persistSavedPalette();
            renderSavedPalette();
        }

        bridge.api.applyPaletteLayout = applyPaletteLayout;
        bridge.api.hexToRgb = hexToRgb;
        bridge.api.rgbToHex = rgbToHex;
        bridge.api.mixColors = mixColors;
        bridge.api.drawShadeBar = drawShadeBar;
        bridge.api.getShadeBarColorAt = getShadeBarColorAt;
        bridge.api.loadSavedPalette = loadSavedPalette;
        bridge.api.persistSavedPalette = persistSavedPalette;
        bridge.api.addColorToRecentPalette = addColorToRecentPalette;
        bridge.api.setCurrentColor = setCurrentColor;
        bridge.api.handleUIColorPick = handleUIColorPick;
        bridge.api.renderColorFamilies = renderColorFamilies;
        bridge.api.renderSavedPalette = renderSavedPalette;
        bridge.api.renderRecentPalette = renderRecentPalette;
        bridge.api.addCurrentColorToPalette = addCurrentColorToPalette;
        bridge.api.clearSavedPalette = clearSavedPalette;

        window.PixelForgePalette = {
            bridge,
            refs,
            constants,
            state,
            helpers,
            api: bridge.api
        };

        applyPaletteLayout();
        loadSavedPalette();
        setCurrentColor(state.currentColor || "#000000", { skipRecent: true });
        renderColorFamilies();
        renderSavedPalette();
        renderRecentPalette();

        if (typeof window.PixelForgeForcePaletteRefresh === "function") {
            window.PixelForgeForcePaletteRefresh();
        }

        if (typeof window.PixelForgeInitializeApp === "function") {
            window.PixelForgeInitializeApp();
        }

        return true;
    }

    function waitForBridge() {
        if (!installPaletteModule()) {
            requestAnimationFrame(waitForBridge);
        }
    }

    waitForBridge();
})();