const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

const canvasContainer = document.getElementById("canvasContainer");

const tileCanvas = document.getElementById("tilePreview");
const tileCtx = tileCanvas ? tileCanvas.getContext("2d") : null;

const shadeBarCanvas = document.getElementById("shadeBar");
const shadeBarCtx = shadeBarCanvas ? shadeBarCanvas.getContext("2d") : null;

let previewOverlayCanvas = null;
let previewOverlayCtx = null;
let previewOverlayQueued = false;

const pencilButton = document.getElementById("pencilTool");
const lineButton = document.getElementById("lineTool");
const fillButton = document.getElementById("fillTool");
const eraserButton = document.getElementById("eraserTool");
const selectButton = document.getElementById("selectTool");
const eyedropperButton = document.getElementById("eyedropperTool");

let clearCanvasButton = null;

let rectButton = document.getElementById("rectTool");
let ellipseButton = document.getElementById("ellipseTool");
let rectModeSelect = document.getElementById("rectMode");

let undoButton = document.getElementById("undoButton");
let redoButton = document.getElementById("redoButton");
let historyStatus = document.getElementById("historyStatus");
let editPanelBlock = document.getElementById("editPanelBlock");

const gridButton = document.getElementById("toggleGrid");
const mirrorButton = document.getElementById("mirrorToggle");
const importButton = document.getElementById("importPNG");
const importPNGInput = document.getElementById("importPNGInput");
const importNewFrameButton = document.getElementById("importPNGNewFrame");
const importPNGNewFrameInput = document.getElementById("importPNGNewFrameInput");
const importSpritesheetButton = document.getElementById("importSpritesheet");
const importSpritesheetInput = document.getElementById("importSpritesheetInput");
const exportButton = document.getElementById("exportPNG");
const exportSpritesheetButton = document.getElementById("exportSpritesheet");
const exportSpritesheetVerticalButton = document.getElementById("exportSpritesheetVertical");
const exportSpritesheetWrappedButton = document.getElementById("exportSpritesheetWrapped");
const previewButton = document.getElementById("renderPreview");

const canvasSizeSelector = document.getElementById("canvasSize");
const colorPicker = document.getElementById("colorPicker");
const brushSelect = document.getElementById("brushSelect");

const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");
const zoomResetButton = document.getElementById("zoomReset");
const zoomLabel = document.getElementById("zoomLabel");

const frameNavRow = document.getElementById("frameNavRow");
const prevFrameButton = document.getElementById("prevFrame");
const nextFrameButton = document.getElementById("nextFrame");
const addFrameButton = document.getElementById("addFrame");
const duplicateFrameButton = document.getElementById("duplicateFrame");
const deleteFrameButton = document.getElementById("deleteFrame");
const moveFrameLeftButton = document.getElementById("moveFrameLeft");
const moveFrameRightButton = document.getElementById("moveFrameRight");
const frameStatus = document.getElementById("frameStatus");
const decreaseFrameDurationButton = document.getElementById("decreaseFrameDuration");
const increaseFrameDurationButton = document.getElementById("increaseFrameDuration");
const frameDurationInput = document.getElementById("frameDurationInput");
const frameDurationStatus = document.getElementById("frameDurationStatus");

const playAnimationButton = document.getElementById("playAnimation");
const stopAnimationButton = document.getElementById("stopAnimation");
const fpsInput = document.getElementById("fpsInput");
const playbackModeSelect = document.getElementById("playbackMode");
const playbackStatus = document.getElementById("playbackStatus");

const colorFamiliesContainer = document.getElementById("colorFamilies");
const savedPaletteContainer = document.getElementById("savedPalette");
const recentPaletteContainer = document.getElementById("recentPalette");
const savePaletteColorButton = document.getElementById("savePaletteColor");
const clearPaletteButton = document.getElementById("clearPalette");
const toggleColorPanelButton = document.getElementById("toggleColorPanel");
const colorPanelGroup = document.getElementById("colorPanelGroup");
const variantModeSelect = document.getElementById("variantMode");
const generateVariantButton = document.getElementById("generateVariant");
const rerollVariantButton = document.getElementById("rerollVariant");
const variantStatus = document.getElementById("variantStatus");

const onionSkinPanel = document.getElementById("onionSkinPanel");
const onionSkinToggleButton = document.getElementById("onionSkinToggle");
const frameTimeline = document.getElementById("frameTimeline");
const timelinePrevButton = document.getElementById("timelinePrev");
const timelineNextButton = document.getElementById("timelineNext");

const showFramesModeButton = document.getElementById("showFramesMode");
const showTilesetModeButton = document.getElementById("showTilesetMode");
const framesWorkspace = document.getElementById("framesWorkspace");
const tilesetWorkspace = document.getElementById("tilesetWorkspace");
const frameReorderToggleButton = document.getElementById("frameReorderToggle");

const toggleWorkspacePanelButton = document.getElementById("toggleWorkspacePanel");
const animationWorkspaceContent = document.getElementById("animationWorkspaceContent");
const previewPanel = document.getElementById("previewPanel");
const toolsPanel = document.getElementById("tools");

const toggleLayerModeButton = document.getElementById("toggleLayerMode");
const layerPanel = document.getElementById("layerPanel");
const addLayerButton = document.getElementById("addLayer");
const deleteLayerButton = document.getElementById("deleteLayer");
const layerStatus = document.getElementById("layerStatus");
const layerList = document.getElementById("layerList");

const timelineHeaderRow = timelinePrevButton ? timelinePrevButton.closest(".timelineHeaderRow") : null;
const frameTimelinePanelBlock = frameTimeline ? frameTimeline.closest(".panelBlock") : null;
const frameReorderPanelBlock = frameReorderToggleButton ? frameReorderToggleButton.closest(".panelBlock") : null;

const toolsFoldout = pencilButton ? pencilButton.closest(".foldoutSection") : null;
const brushViewFoldout = brushSelect ? brushSelect.closest(".foldoutSection") : null;
const framesPlaybackFoldout = addFrameButton ? addFrameButton.closest(".foldoutSection") : null;
const importExportFoldout = importButton ? importButton.closest(".foldoutSection") : null;
const animationWorkspaceFoldout = animationWorkspaceContent ? animationWorkspaceContent.closest(".foldoutSection") : null;
const colorFoldout = colorPanelGroup ? colorPanelGroup.closest(".foldoutSection") : null;
const documentFoldout = canvasSizeSelector ? canvasSizeSelector.closest(".foldoutSection") : null;

let advancedLayerPanelBlock = null;
let advancedLayerToggleButton = null;
let advancedLayerControls = null;
let layerOpacitySlider = null;
let layerOpacityValue = null;

let layerUtilityPanelBlock = null;
let mergeLayerButton = null;
let clearLayerButton = null;
let duplicateLayerMiniButton = null;

let saveProjectButton = null;
let loadProjectButton = null;
let loadProjectInput = null;

let shapeToolPanelBlock = null;
let noiseToolPanelBlock = null;
let noiseToggleButton = null;
let noiseStrengthSlider = null;
let noiseStrengthValue = null;
let noiseDensitySlider = null;
let noiseDensityValue = null;

let variantNoisePanelBlock = null;
let variantNoiseToggleButton = null;

let flipToolPanelBlock = null;
let flipHorizontalButton = null;
let flipVerticalButton = null;
let rotateRightButton = null;

let customBrushUtilityPanelBlock = null;
let unloadCustomBrushButton = null;
let pixelPerfectCustomBrushButton = null;
let exportCustomBrushButton = null;
let importCustomBrushButton = null;
let importCustomBrushInput = null;

const DISPLAY_SIZE = 768;
const HIGH_RES_DISPLAY_SIZE = 1024;
const SAVED_PALETTE_SIZE = 8;

function getRenderDisplaySize() {
    return GRID_SIZE >= 512 ? HIGH_RES_DISPLAY_SIZE : DISPLAY_SIZE;
}

function getRenderCellSize() {
    return getRenderDisplaySize() / GRID_SIZE;
}
const RECENT_PALETTE_SIZE = 8;
const PALETTE_STORAGE_KEY = "pixel-forge-saved-palette";
const PROJECT_FILE_EXTENSION = ".pixelhammer";
const PROJECT_FILE_MIME = "application/json";
const PROJECT_FILE_VERSION = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const MIN_FPS = 1;
const MAX_FPS = 24;
const MIN_FRAME_DURATION = 1;
const MAX_FRAME_DURATION = 24;
const MIN_LAYER_OPACITY = 0;
const MAX_LAYER_OPACITY = 100;
const ONION_PREV_ALPHA = 0.22;
const ONION_NEXT_ALPHA = 0.12;
const TIMELINE_THUMB_SIZE = 56;
const VISIBLE_FRAME_COUNT = 6;
const TIMELINE_PRIMARY_VIEW_OFFSET = 1;
const PALETTE_SPLIT_COLUMNS = 4;
const MAX_HISTORY_STATES = 8;
const MAX_LAYERS = 8;

const CANVAS_CONTAINER_PADDING = 16;
const TILE_PREVIEW_MARGIN = 12;
const TILE_PREVIEW_GAP = 0;
const MAX_EXPORT_SCALE = 32;
const MIN_NOISE_STRENGTH = 0;
const MAX_NOISE_STRENGTH = 100;
const MIN_NOISE_DENSITY = 0;
const MAX_NOISE_DENSITY = 100;
const NOISE_LIGHTNESS_START_THRESHOLD = 0.75;

const COLOR_FAMILIES = [
    { name: "Red", color: "#d83a3a" },
    { name: "Orange", color: "#e67e22" },
    { name: "Yellow", color: "#d4c32a" },
    { name: "Green", color: "#34a853" },
    { name: "Cyan", color: "#2bb6c9" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Purple", color: "#8b5cf6" },
    { name: "Gray", color: "#8a8a8a" }
];

let GRID_SIZE = 32;
let zoomLevel = 1;
let CELL_SIZE = getRenderDisplaySize() / GRID_SIZE;

canvas.width = getRenderDisplaySize();
canvas.height = getRenderDisplaySize();

let gridVisible = true;
let currentColor = "#000000";
let currentTool = "pencil";
let brushType = "pixel";
let lastStandardBrushType = "pixel";
let rectMode = "outline";
let mirrorMode = false;
let onionSkinEnabled = true;
let noiseEnabled = false;
let noiseStrength = 28;
let noiseDensity = 72;
let variantIncludeNoise = false;

let currentWorkspaceMode = "frames";
let framesUnlocked = false;
let workspacePanelExpanded = false;
let colorPanelVisible = true;
let multiLayerModeEnabled = false;
let advancedLayerControlsExpanded = false;

let drawing = false;
let lastPixel = null;
let hoverPixel = null;
let ditherOrigin = null;
let pointerDownOnCanvas = false;
let drawPointerId = null;
let isPointerOutsideCanvas = false;

let selecting = false;
let movingSelection = false;
let selectionMoveStateSaved = false;
let selectionDetachedFromCanvas = false;

let rectDrawing = false;
let rectStart = null;
let rectEnd = null;

let selectionStart = null;
let originalSelectionStart = null;
let selectionEnd = null;
let selectionOffset = { x: 0, y: 0 };
let selectionPixels = [];
let selectionWidth = 0;
let selectionHeight = 0;

let customStampBrush = null;
let customBrushPixelCache = null;
let customBrushStampCacheCanvas = null;
let customBrushStampCacheRenderSize = 0;
let customBrushStampCacheSignature = "";
const CUSTOM_BRUSH_TYPE = "customSelection";

let lineAnchor = null;
let lineStartPoint = null;
let lineHasCommittedSegment = false;

let undoStack = [];
let redoStack = [];

let frames = [];
let currentFrameIndex = 0;
let timelineStartIndex = 0;
let frameMoveSelectionIndex = 0;
let currentLayerIndex = 0;

let savedPalette = new Array(SAVED_PALETTE_SIZE).fill(null);
let recentPalette = [];

let isPlaying = false;
let playbackTimer = null;
let playbackFrameBeforePlay = 0;
let playbackMode = "loop";
let playbackDirection = 1;
let playbackTimelineFrozenIndex = 0;

let dragFrameIndex = null;
let dragOverFrameIndex = null;
let dragStartedInWindow = false;

let appInitialized = false;

let currentFrameRenderCacheCanvas = null;
let currentFrameRenderCacheCtx = null;
let currentFrameRenderCacheFrameIndex = -1;
let currentFrameRenderCacheDirty = true;

let currentFrameLayerRangeCache = {
    lowerCanvas: null,
    upperCanvas: null,
    frameIndex: -1,
    splitLayerIndex: -1,
    dirty: true
};

let workspacePreviewQueued = false;
let timelineRefreshQueued = false;
let timelineRefreshDeferred = false;
let playbackFrameDrawQueued = false;
let activeStrokeRefreshQueued = false;
let activeStrokeRefreshTimer = null;
let lastActiveStrokeRefreshAt = 0;
let activeStrokeRefreshPending = false;
let pendingCustomStampQueue = [];
let pendingCustomStampKeySet = new Set();
let customStampFlushQueued = false;
let customStampWorker = null;
let customStampWorkerSupported = false;
let customStampWorkerJobId = 0;
let customStampWorkerBusy = false;
let customStampWorkerPendingRedraw = false;
let pendingCustomBrushWorkerStampQueue = [];
let liveCustomBrushStampFlushQueued = false;
let pendingCustomBrushWorkerLineSegment = null;
let customStampBatchDeferQueued = false;
let customBrushStrokePumpQueued = false;
let pendingCustomBrushStrokePoints = [];
let compositeRenderWorker = null;
let compositeRenderWorkerReady = false;
let compositeRenderWorkerSupported = !!window.Worker && !!window.OffscreenCanvas && !!window.ImageBitmap;
let compositeRenderFallbackReason = "";
let compositeRenderInFlight = false;
let compositeRenderPendingKey = "";
let compositeRenderCompletedKey = "";
let compositeRenderBitmap = null;
let compositeContentRevision = 0;
let activeStrokeDirtyRect = null;
let layerRangeCacheDirtyDeferred = false;
let lastVariantMode = "safe";
let layerOpacityInteractionSaved = false;
let customBrushArmed = false;
let customBrushHintShown = false;
let customBrushPixelPerfectMode = false;
let updateFramesButton = null;
let lastStrokeHistorySaveAt = 0;
let lastStrokeHistoryTool = null;
let lastStrokeHistoryBrush = null;
let lastStrokeHistoryColor = null;

function injectRuntimeUiStyles() {
    if (document.getElementById("pixelForgeRuntimeUiStyles")) return;

    const style = document.createElement("style");
    style.id = "pixelForgeRuntimeUiStyles";
    style.textContent = `
        #tools .buttonGrid.toolButtonGrid button {
            padding: 7px !important;
            font-size: 12px !important;
            min-height: 34px !important;
        }

        .pixelForgeCompactEditPanel {
            margin-bottom: 14px !important;
        }

        .pixelForgeCompactEditPanel h3 {
            margin-bottom: 8px !important;
        }

        .pixelForgeHotkeyButton {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1px;
            min-height: 34px !important;
            padding: 4px 4px !important;
            line-height: 1;
        }

        .pixelForgeButtonMainLabel {
            font-size: 12px;
            font-weight: bold;
        }

        .pixelForgeButtonHotkeyLabel {
            font-size: 9px;
            opacity: 0.8;
            font-weight: normal;
        }

        #historyStatus.pixelForgeCompactHistory {
            margin-top: 6px !important;
            padding: 5px 8px !important;
            font-size: 11px !important;
        }

        #canvasContainer {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 0;
            min-height: 0;
            box-sizing: border-box;
        }

        #pixelCanvas {
            display: block !important;
            max-width: none !important;
            max-height: none !important;
            image-rendering: pixelated !important;
            image-rendering: crisp-edges !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
        }

        #tilePreview {
            image-rendering: pixelated !important;
            image-rendering: crisp-edges !important;
        }

        .pixelForgeAdvancedLayerControls {
            display: none;
            margin-top: 10px;
        }

        .pixelForgeAdvancedLayerControls.expanded {
            display: block;
        }

        .pixelForgeLayerOpacityRow {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .pixelForgeLayerOpacityRow input[type="range"] {
            width: 100%;
            margin: 0;
        }

        .pixelForgeLayerOpacityValue {
            min-width: 44px;
            text-align: right;
            font-size: 12px;
            font-weight: bold;
            opacity: 0.9;
        }

        .pixelForgeAdvancedLayerHint {
            margin-top: 6px;
            font-size: 11px;
            opacity: 0.75;
        }

        .pixelForgeLayerUtilityRow {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
        }

        .pixelForgeLayerUtilityRow button {
            min-width: 0;
            padding: 6px 4px !important;
            min-height: 30px !important;
            font-size: 11px !important;
        }

        .pixelForgeShapePanelTitle {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .pixelForgeShapeToolButtons {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
            margin-bottom: 8px;
        }

        .pixelForgeShapeToolButton {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            min-height: 38px !important;
            padding: 5px 4px !important;
            font-size: 11px !important;
        }

        .pixelForgeShapeToolGlyph {
            font-size: 14px;
            line-height: 1;
        }

        .pixelForgeShapeModeRow {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .pixelForgeShapeModeOption {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 11px;
            cursor: pointer;
            user-select: none;
        }

        .pixelForgeShapeModeOption input {
            margin: 0;
        }

        .pixelForgeNoisePanelTitle,
        .pixelForgeFlipPanelTitle,
        .pixelForgeVariantNoisePanelTitle {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .pixelForgeNoiseToggleButton,
        .pixelForgeVariantNoiseToggleButton {
            width: 100%;
            margin-bottom: 8px;
            min-height: 32px !important;
            font-size: 12px !important;
        }

        .pixelForgeNoiseControls {
            display: grid;
            gap: 8px;
        }

        .pixelForgeNoiseRow {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 42px;
            gap: 8px;
            align-items: center;
        }

        .pixelForgeNoiseRow input[type="range"] {
            width: 100%;
            margin: 0;
        }

        .pixelForgeNoiseValue {
            text-align: right;
            font-size: 11px;
            font-weight: bold;
            opacity: 0.9;
        }

        .pixelForgeNoiseToggleButton.noiseEnabledState,
        .pixelForgeNoiseSliderActive {
            accent-color: #ff9b2f;
        }

        .pixelForgeNoiseToggleButton.noiseEnabledState,
        #pencilTool.pixelForgeNoiseLinkedTool {
            background: #ff9b2f !important;
            border-color: #ffb45c !important;
            color: #1f1f1f !important;
        }

        .pixelForgeVariantNoiseToggleButton.variantNoiseEnabledState {
            background: #a855f7 !important;
            border-color: #c084fc !important;
            color: #ffffff !important;
        }

        .pixelForgeVariantNoiseHint {
            font-size: 11px;
            opacity: 0.75;
            line-height: 1.3;
        }

        .pixelForgeFlipButtonRow {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
        }

        .pixelForgeFlipButton {
            min-width: 0;
            min-height: 34px !important;
            padding: 6px 4px !important;
            font-size: 16px !important;
            line-height: 1;
        }

        .pixelForgeCustomBrushUtilityRow {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
            margin-top: 8px;
        }

        .pixelForgeCustomBrushUtilityRow button {
            min-width: 0;
            min-height: 30px !important;
            padding: 6px 4px !important;
            font-size: 11px !important;
        }

        .pixelForgeClearCanvasButton {
            display: block;
            width: 100%;
            margin-top: 6px;
            min-height: 18px !important;
            padding: 4px 6px !important;
            font-size: 11px !important;
            line-height: 1.1;
        }

        .layerRow.pixelForgeOpaqueLayerRow {
            background: rgba(50, 170, 80, 0.18);
        }

        .layerRow.pixelForgeTransparentLayerRow {
            background: rgba(220, 70, 70, 0.16);
        }

        .layerRow.activeLayerRow.pixelForgeOpaqueLayerRow {
            background: rgba(50, 170, 80, 0.34) !important;
            box-shadow: inset 0 0 0 1px rgba(110, 255, 150, 0.35);
        }

        .layerRow.activeLayerRow.pixelForgeTransparentLayerRow {
            box-shadow: inset 0 0 0 1px rgba(255, 170, 170, 0.35);
        }

        .pixelForgeFrameRefreshRow {
            margin-top: 8px;
            display: flex;
            justify-content: flex-end;
        }

        .pixelForgeFrameRefreshButton {
            min-width: 0;
            min-height: 28px !important;
            padding: 5px 8px !important;
            font-size: 11px !important;
            line-height: 1.1;
        }
    `;
    document.head.appendChild(style);
}

function syncShapeModeRadios() {
    const outlineRadio = document.getElementById("rectModeOutline");
    const fillRadio = document.getElementById("rectModeFill");

    if (outlineRadio) {
        outlineRadio.checked = rectMode !== "fill";
    }

    if (fillRadio) {
        fillRadio.checked = rectMode === "fill";
    }
}

function ensureShapeToolControlsExist() {
    if (!toolsPanel) return;

    rectButton = document.getElementById("rectTool");
    ellipseButton = document.getElementById("ellipseTool");
    rectModeSelect = document.getElementById("rectMode");
    shapeToolPanelBlock = document.getElementById("pixelForgeShapeToolPanel");

    if (!rectButton || !ellipseButton || !rectModeSelect) {
        const targetPanel =
            (selectButton && selectButton.closest(".panelBlock")) ||
            (brushSelect && brushSelect.closest(".panelBlock")) ||
            toolsPanel.querySelector(".panelBlock");

        if (!targetPanel) return;

        const shapePanel = document.createElement("div");
        shapePanel.id = "pixelForgeShapeToolPanel";
        shapePanel.className = "panelBlock";
        shapePanel.innerHTML = `
            <div class="pixelForgeShapePanelTitle">Rec / Elip's Tool</div>
            <div class="pixelForgeShapeToolButtons">
                <button id="rectTool" class="pixelForgeShapeToolButton" type="button" title="Rectangle Tool">
                    <span class="pixelForgeShapeToolGlyph">□</span>
                    <span>Rec</span>
                </button>
                <button id="ellipseTool" class="pixelForgeShapeToolButton" type="button" title="Ellipse Tool">
                    <span class="pixelForgeShapeToolGlyph">○</span>
                    <span>Elip's</span>
                </button>
            </div>
            <div class="pixelForgeShapeModeRow">
                <label class="pixelForgeShapeModeOption">
                    <input id="rectModeOutline" type="radio" name="pixelForgeShapeMode" value="outline">
                    <span>Empty</span>
                </label>
                <label class="pixelForgeShapeModeOption">
                    <input id="rectModeFill" type="radio" name="pixelForgeShapeMode" value="fill">
                    <span>Fill</span>
                </label>
                <select id="rectMode" style="display:none;">
                    <option value="outline">Outline</option>
                    <option value="fill">Filled</option>
                </select>
            </div>
        `;

        if (targetPanel.nextSibling) {
            targetPanel.parentNode.insertBefore(shapePanel, targetPanel.nextSibling);
        } else {
            targetPanel.parentNode.appendChild(shapePanel);
        }

        rectButton = document.getElementById("rectTool");
        ellipseButton = document.getElementById("ellipseTool");
        rectModeSelect = document.getElementById("rectMode");
        shapeToolPanelBlock = document.getElementById("pixelForgeShapeToolPanel");
    }

    if (rectButton && !rectButton.dataset.boundRectTool) {
        rectButton.onclick = () => setTool("rect");
        rectButton.dataset.boundRectTool = "true";
    }

    if (ellipseButton && !ellipseButton.dataset.boundEllipseTool) {
        ellipseButton.onclick = () => setTool("ellipse");
        ellipseButton.dataset.boundEllipseTool = "true";
    }

    const outlineRadio = document.getElementById("rectModeOutline");
    const fillRadio = document.getElementById("rectModeFill");

    if (rectModeSelect && !rectModeSelect.dataset.boundRectMode) {
        rectModeSelect.onchange = () => {
            rectMode = rectModeSelect.value === "fill" ? "fill" : "outline";
            syncShapeModeRadios();
            openFoldoutForElement(rectModeSelect);
            refreshWorkspacePreview();
        };
        rectModeSelect.dataset.boundRectMode = "true";
    }

    if (outlineRadio && !outlineRadio.dataset.boundShapeMode) {
        outlineRadio.onchange = () => {
            if (!outlineRadio.checked) return;
            rectMode = "outline";
            if (rectModeSelect) {
                rectModeSelect.value = "outline";
            }
            openFoldoutForElement(outlineRadio);
            refreshWorkspacePreview();
        };
        outlineRadio.dataset.boundShapeMode = "true";
    }

    if (fillRadio && !fillRadio.dataset.boundShapeMode) {
        fillRadio.onchange = () => {
            if (!fillRadio.checked) return;
            rectMode = "fill";
            if (rectModeSelect) {
                rectModeSelect.value = "fill";
            }
            openFoldoutForElement(fillRadio);
            refreshWorkspacePreview();
        };
        fillRadio.dataset.boundShapeMode = "true";
    }

    syncShapeModeRadios();
}

function ensureFlipControlsExist() {
    if (!toolsPanel) return;

    flipToolPanelBlock = document.getElementById("pixelForgeFlipToolPanel");
    flipHorizontalButton = document.getElementById("pixelForgeFlipHorizontal");
    flipVerticalButton = document.getElementById("pixelForgeFlipVertical");
    rotateRightButton = document.getElementById("pixelForgeRotateRight");

    if (!flipToolPanelBlock) {
        const targetAfter = document.getElementById("pixelForgeShapeToolPanel");
        if (!targetAfter || !targetAfter.parentNode) return;

        flipToolPanelBlock = document.createElement("div");
        flipToolPanelBlock.id = "pixelForgeFlipToolPanel";
        flipToolPanelBlock.className = "panelBlock";
        flipToolPanelBlock.innerHTML = `
            <div class="pixelForgeFlipPanelTitle">Flip Control</div>
            <div class="pixelForgeFlipButtonRow">
                <button id="pixelForgeFlipHorizontal" class="pixelForgeFlipButton" type="button" title="Flip Horizontal">↔</button>
                <button id="pixelForgeFlipVertical" class="pixelForgeFlipButton" type="button" title="Flip Vertical">↕</button>
                <button id="pixelForgeRotateRight" class="pixelForgeFlipButton" type="button" title="Rotate 90°">⟳</button>
            </div>
        `;

        if (targetAfter.nextSibling) {
            targetAfter.parentNode.insertBefore(flipToolPanelBlock, targetAfter.nextSibling);
        } else {
            targetAfter.parentNode.appendChild(flipToolPanelBlock);
        }
    }

    flipToolPanelBlock = document.getElementById("pixelForgeFlipToolPanel");
    flipHorizontalButton = document.getElementById("pixelForgeFlipHorizontal");
    flipVerticalButton = document.getElementById("pixelForgeFlipVertical");
    rotateRightButton = document.getElementById("pixelForgeRotateRight");

    if (flipHorizontalButton && !flipHorizontalButton.dataset.boundFlipHorizontal) {
        flipHorizontalButton.onclick = () => flipActiveLayerHorizontal();
        flipHorizontalButton.dataset.boundFlipHorizontal = "true";
    }

    if (flipVerticalButton && !flipVerticalButton.dataset.boundFlipVertical) {
        flipVerticalButton.onclick = () => flipActiveLayerVertical();
        flipVerticalButton.dataset.boundFlipVertical = "true";
    }

    if (rotateRightButton && !rotateRightButton.dataset.boundRotateRight) {
        rotateRightButton.onclick = () => rotateActiveLayerRight();
        rotateRightButton.dataset.boundRotateRight = "true";
    }
}

function ensureNoiseControlsExist() {
    if (!toolsPanel) return;

    ensureFlipControlsExist();

    noiseToolPanelBlock = document.getElementById("pixelForgeNoiseToolPanel");
    noiseToggleButton = document.getElementById("pixelForgeNoiseToggle");
    noiseStrengthSlider = document.getElementById("pixelForgeNoiseStrength");
    noiseStrengthValue = document.getElementById("pixelForgeNoiseStrengthValue");
    noiseDensitySlider = document.getElementById("pixelForgeNoiseDensity");
    noiseDensityValue = document.getElementById("pixelForgeNoiseDensityValue");

    if (!noiseToolPanelBlock) {
        const targetAfter = document.getElementById("pixelForgeFlipToolPanel") || document.getElementById("pixelForgeShapeToolPanel");
        if (!targetAfter || !targetAfter.parentNode) return;

        noiseToolPanelBlock = document.createElement("div");
        noiseToolPanelBlock.id = "pixelForgeNoiseToolPanel";
        noiseToolPanelBlock.className = "panelBlock";
        noiseToolPanelBlock.innerHTML = `
            <div class="pixelForgeNoisePanelTitle">Noise Tool</div>
            <button id="pixelForgeNoiseToggle" class="pixelForgeNoiseToggleButton" type="button">Noise: OFF</button>
            <div class="pixelForgeNoiseControls">
                <label class="miniLabel" for="pixelForgeNoiseStrength">Strength</label>
                <div class="pixelForgeNoiseRow">
                    <input id="pixelForgeNoiseStrength" type="range" min="${MIN_NOISE_STRENGTH}" max="${MAX_NOISE_STRENGTH}" step="1" value="${noiseStrength}">
                    <div id="pixelForgeNoiseStrengthValue" class="pixelForgeNoiseValue">${noiseStrength}%</div>
                </div>
                <label class="miniLabel" for="pixelForgeNoiseDensity">Density</label>
                <div class="pixelForgeNoiseRow">
                    <input id="pixelForgeNoiseDensity" type="range" min="${MIN_NOISE_DENSITY}" max="${MAX_NOISE_DENSITY}" step="1" value="${noiseDensity}">
                    <div id="pixelForgeNoiseDensityValue" class="pixelForgeNoiseValue">${noiseDensity}%</div>
                </div>
            </div>
        `;

        if (targetAfter.nextSibling) {
            targetAfter.parentNode.insertBefore(noiseToolPanelBlock, targetAfter.nextSibling);
        } else {
            targetAfter.parentNode.appendChild(noiseToolPanelBlock);
        }
    }

    noiseToolPanelBlock = document.getElementById("pixelForgeNoiseToolPanel");
    noiseToggleButton = document.getElementById("pixelForgeNoiseToggle");
    noiseStrengthSlider = document.getElementById("pixelForgeNoiseStrength");
    noiseStrengthValue = document.getElementById("pixelForgeNoiseStrengthValue");
    noiseDensitySlider = document.getElementById("pixelForgeNoiseDensity");
    noiseDensityValue = document.getElementById("pixelForgeNoiseDensityValue");

    if (noiseToggleButton && !noiseToggleButton.dataset.boundNoiseToggle) {
        noiseToggleButton.onclick = () => {
            if (isPlaying) return;
            noiseEnabled = !noiseEnabled;
            openFoldoutForElement(noiseToggleButton);
            updateNoiseUI();
            refreshWorkspacePreview();
        };
        noiseToggleButton.dataset.boundNoiseToggle = "true";
    }

    if (noiseStrengthSlider && !noiseStrengthSlider.dataset.boundNoiseStrengthInput) {
        noiseStrengthSlider.addEventListener("input", () => {
            noiseStrength = clamp(parseInt(noiseStrengthSlider.value, 10) || 0, MIN_NOISE_STRENGTH, MAX_NOISE_STRENGTH);
            updateNoiseUI();
            refreshWorkspacePreview();
        });
        noiseStrengthSlider.dataset.boundNoiseStrengthInput = "true";
    }

    if (noiseDensitySlider && !noiseDensitySlider.dataset.boundNoiseDensityInput) {
        noiseDensitySlider.addEventListener("input", () => {
            noiseDensity = clamp(parseInt(noiseDensitySlider.value, 10) || 0, MIN_NOISE_DENSITY, MAX_NOISE_DENSITY);
            updateNoiseUI();
            refreshWorkspacePreview();
        });
        noiseDensitySlider.dataset.boundNoiseDensityInput = "true";
    }
}

function ensureVariantNoiseControlsExist() {
    if (!previewPanel) return;

    variantNoisePanelBlock = document.getElementById("pixelForgeVariantNoisePanel");
    variantNoiseToggleButton = document.getElementById("pixelForgeVariantNoiseToggle");

    if (!variantNoisePanelBlock) {
        const targetPanel =
            (generateVariantButton && generateVariantButton.closest(".panelBlock")) ||
            (variantModeSelect && variantModeSelect.closest(".panelBlock")) ||
            previewPanel.querySelector(".panelBlock");

        if (!targetPanel || !targetPanel.parentNode) return;

        variantNoisePanelBlock = document.createElement("div");
        variantNoisePanelBlock.id = "pixelForgeVariantNoisePanel";
        variantNoisePanelBlock.className = "panelBlock";
        variantNoisePanelBlock.innerHTML = `
            <div class="pixelForgeVariantNoisePanelTitle">Variant Noise</div>
            <button id="pixelForgeVariantNoiseToggle" class="pixelForgeVariantNoiseToggleButton" type="button">Noise Colors: OFF</button>
            <div class="pixelForgeVariantNoiseHint">OFF keeps noisy shade micro-colors grouped out of recolors. Turn ON for full static-style remaps.</div>
        `;

        if (targetPanel.nextSibling) {
            targetPanel.parentNode.insertBefore(variantNoisePanelBlock, targetPanel.nextSibling);
        } else {
            targetPanel.parentNode.appendChild(variantNoisePanelBlock);
        }
    }

    variantNoisePanelBlock = document.getElementById("pixelForgeVariantNoisePanel");
    variantNoiseToggleButton = document.getElementById("pixelForgeVariantNoiseToggle");

    if (variantNoiseToggleButton && !variantNoiseToggleButton.dataset.boundVariantNoiseToggle) {
        variantNoiseToggleButton.onclick = () => {
            if (isPlaying) return;
            variantIncludeNoise = !variantIncludeNoise;
            openFoldoutForElement(variantNoiseToggleButton);
            updateVariantNoiseUI();
            updateVariantUI();
        };
        variantNoiseToggleButton.dataset.boundVariantNoiseToggle = "true";
    }
}

function updateVariantNoiseUI() {
    ensureVariantNoiseControlsExist();

    if (variantNoiseToggleButton) {
        variantNoiseToggleButton.textContent = variantIncludeNoise ? "Noise Colors: ON" : "Noise Colors: OFF";
        variantNoiseToggleButton.classList.toggle("activeTool", variantIncludeNoise);
        variantNoiseToggleButton.classList.toggle("variantNoiseEnabledState", variantIncludeNoise);
        variantNoiseToggleButton.disabled = isPlaying;
    }
}

function updateNoiseUI() {
    ensureNoiseControlsExist();

    if (noiseToggleButton) {
        noiseToggleButton.textContent = noiseEnabled ? "Noise: ON" : "Noise: OFF";
        noiseToggleButton.classList.toggle("activeTool", noiseEnabled);
        noiseToggleButton.classList.toggle("noiseEnabledState", noiseEnabled);
    }

    if (noiseStrengthSlider) {
        noiseStrengthSlider.value = noiseStrength;
        noiseStrengthSlider.classList.toggle("pixelForgeNoiseSliderActive", noiseEnabled && currentTool === "pencil");
    }

    if (noiseStrengthValue) {
        noiseStrengthValue.textContent = `${noiseStrength}%`;
    }

    if (noiseDensitySlider) {
        noiseDensitySlider.value = noiseDensity;
        noiseDensitySlider.classList.toggle("pixelForgeNoiseSliderActive", noiseEnabled && currentTool === "pencil");
    }

    if (noiseDensityValue) {
        noiseDensityValue.textContent = `${noiseDensity}%`;
    }

    if (pencilButton) {
        pencilButton.classList.toggle("pixelForgeNoiseLinkedTool", noiseEnabled && currentTool === "pencil");
    }

    const noiseControlsActive = noiseEnabled && currentTool === "pencil";

    if (noiseStrengthSlider) {
        noiseStrengthSlider.disabled = isPlaying;
    }

    if (noiseDensitySlider) {
        noiseDensitySlider.disabled = isPlaying;
    }

    if (noiseToolPanelBlock) {
        noiseToolPanelBlock.style.opacity = noiseControlsActive || !noiseEnabled ? "1" : "0.94";
    }

    if (flipHorizontalButton) {
        flipHorizontalButton.disabled = isPlaying || !frames.length || getActiveLayer().locked;
    }

    if (flipVerticalButton) {
        flipVerticalButton.disabled = isPlaying || !frames.length || getActiveLayer().locked;
    }

    if (rotateRightButton) {
        rotateRightButton.disabled = isPlaying || !frames.length || getActiveLayer().locked;
    }
}

function ensureCustomBrushUtilityControlsExist() {
    if (!brushSelect) return;

    customBrushUtilityPanelBlock = document.getElementById("pixelForgeCustomBrushUtilityPanel");
    unloadCustomBrushButton = document.getElementById("pixelForgeUnloadCustomBrush");
    pixelPerfectCustomBrushButton = document.getElementById("pixelForgePixelPerfectCustomBrush");

    if (!customBrushUtilityPanelBlock) {
        customBrushUtilityPanelBlock = document.createElement("div");
        customBrushUtilityPanelBlock.id = "pixelForgeCustomBrushUtilityPanel";
        customBrushUtilityPanelBlock.className = "pixelForgeCustomBrushUtilityRow";
        customBrushUtilityPanelBlock.innerHTML = `
            <button id="pixelForgeUnloadCustomBrush" type="button" title="Unload current custom brush">Unload</button>
            <button id="pixelForgePixelPerfectCustomBrush" type="button" title="Toggle pixel-perfect custom brush preview">Pixel Perfect</button>
        `;

        if (brushSelect.parentNode) {
            if (brushSelect.nextSibling) {
                brushSelect.parentNode.insertBefore(customBrushUtilityPanelBlock, brushSelect.nextSibling);
            } else {
                brushSelect.parentNode.appendChild(customBrushUtilityPanelBlock);
            }
        }
    }

    customBrushUtilityPanelBlock = document.getElementById("pixelForgeCustomBrushUtilityPanel");
    unloadCustomBrushButton = document.getElementById("pixelForgeUnloadCustomBrush");
    pixelPerfectCustomBrushButton = document.getElementById("pixelForgePixelPerfectCustomBrush");

    if (unloadCustomBrushButton && !unloadCustomBrushButton.dataset.boundUnloadCustomBrush) {
        unloadCustomBrushButton.onclick = () => unloadCustomBrush();
        unloadCustomBrushButton.dataset.boundUnloadCustomBrush = "true";
    }

    if (pixelPerfectCustomBrushButton && !pixelPerfectCustomBrushButton.dataset.boundPixelPerfectCustomBrush) {
        pixelPerfectCustomBrushButton.onclick = () => {
            if (isPlaying) return;
            customBrushPixelPerfectMode = !customBrushPixelPerfectMode;
            updateBrushUI();
            refreshWorkspacePreview();
        };
        pixelPerfectCustomBrushButton.dataset.boundPixelPerfectCustomBrush = "true";
    }
}

function ensureClearCanvasControlExists() {
    if (!toolsPanel) return;

    clearCanvasButton = document.getElementById("pixelForgeClearCanvasButton");

    const firstToolGrid = toolsPanel.querySelector(".buttonGrid");
    if (!firstToolGrid) return;

    if (!clearCanvasButton) {
        clearCanvasButton = document.createElement("button");
        clearCanvasButton.id = "pixelForgeClearCanvasButton";
        clearCanvasButton.type = "button";
        clearCanvasButton.className = "pixelForgeClearCanvasButton";
        clearCanvasButton.textContent = "Clear Canvas";

        if (firstToolGrid.nextSibling) {
            firstToolGrid.parentNode.insertBefore(clearCanvasButton, firstToolGrid.nextSibling);
        } else {
            firstToolGrid.parentNode.appendChild(clearCanvasButton);
        }
    }

    if (!clearCanvasButton.dataset.boundClearCanvas) {
        clearCanvasButton.onclick = () => clearCurrentFrameCanvas();
        clearCanvasButton.dataset.boundClearCanvas = "true";
    }

    clearCanvasButton.disabled = isPlaying || !frames.length;
}

function ensureToolButtonsCompact() {
    if (!toolsPanel) return;
    const firstToolGrid = toolsPanel.querySelector(".buttonGrid");
    if (firstToolGrid) {
        firstToolGrid.classList.add("toolButtonGrid");
    }
    ensureClearCanvasControlExists();
    ensureCustomBrushUtilityControlsExist();
    ensureShapeToolControlsExist();
    ensureFlipControlsExist();
    ensureNoiseControlsExist();
}

function setButtonHotkeyMarkup(button, mainText, hotkeyText) {
    if (!button) return;
    if (button.dataset.hotkeyStyled === "true") return;

    button.classList.add("pixelForgeHotkeyButton");
    button.innerHTML = `
        <span class="pixelForgeButtonMainLabel">${mainText}</span>
        <span class="pixelForgeButtonHotkeyLabel">${hotkeyText}</span>
    `;
    button.dataset.hotkeyStyled = "true";
}

function setFoldoutOpen(foldout, isOpen) {
    if (!foldout) return;
    foldout.open = !!isOpen;
}

function syncFoldoutUI() {
    if (framesPlaybackFoldout && (frames.length > 1 || isPlaying)) {
        setFoldoutOpen(framesPlaybackFoldout, true);
    }

    setFoldoutOpen(colorFoldout, colorPanelVisible);
    setFoldoutOpen(
        animationWorkspaceFoldout,
        currentWorkspaceMode === "tileset" ||
        frames.length > 1 ||
        workspacePanelExpanded ||
        framesUnlocked ||
        multiLayerModeEnabled
    );
}

function openFoldoutForElement(element) {
    if (!element) return;
    const foldout = element.closest(".foldoutSection");
    setFoldoutOpen(foldout, true);
}

function ensureProjectControlsExist() {
    if (!previewPanel) return;

    saveProjectButton = document.getElementById("saveProject");
    loadProjectButton = document.getElementById("loadProject");
    loadProjectInput = document.getElementById("loadProjectInput");

    if (!saveProjectButton || !loadProjectButton || !loadProjectInput) {
        const projectPanel = document.createElement("div");
        projectPanel.id = "pixelForgeProjectPanel";
        projectPanel.className = "panelBlock";
        projectPanel.innerHTML = `
            <h3>Project</h3>
            <div class="compactGrid">
                <button id="saveProject" class="pixelForgeHotkeyButton">
                    <span class="pixelForgeButtonMainLabel">Save</span>
                    <span class="pixelForgeButtonHotkeyLabel">Project</span>
                </button>
                <button id="loadProject" class="pixelForgeHotkeyButton">
                    <span class="pixelForgeButtonMainLabel">Load</span>
                    <span class="pixelForgeButtonHotkeyLabel">Project</span>
                </button>
            </div>
            <input id="loadProjectInput" type="file" accept="${PROJECT_FILE_EXTENSION},application/json" style="display:none;">
        `;

        const firstPanelBlock = previewPanel.querySelector(".panelBlock");
        if (firstPanelBlock) {
            previewPanel.insertBefore(projectPanel, firstPanelBlock);
        } else {
            previewPanel.appendChild(projectPanel);
        }

        saveProjectButton = document.getElementById("saveProject");
        loadProjectButton = document.getElementById("loadProject");
        loadProjectInput = document.getElementById("loadProjectInput");
    }

    if (saveProjectButton && !saveProjectButton.dataset.boundSaveProject) {
        saveProjectButton.onclick = () => exportProjectFile();
        saveProjectButton.dataset.boundSaveProject = "true";
    }

    if (loadProjectButton && !loadProjectButton.dataset.boundLoadProject) {
        loadProjectButton.onclick = () => {
            if (isPlaying || !loadProjectInput) return;
            openFoldoutForElement(loadProjectButton);
            loadProjectInput.value = "";
            loadProjectInput.click();
        };
        loadProjectButton.dataset.boundLoadProject = "true";
    }

    if (loadProjectInput && !loadProjectInput.dataset.boundLoadProjectInput) {
        loadProjectInput.onchange = () => {
            const file = loadProjectInput.files && loadProjectInput.files[0];
            if (!file) return;
            importProjectFile(file);
        };
        loadProjectInput.dataset.boundLoadProjectInput = "true";
    }
}

function ensureEditPanelExists() {
    injectRuntimeUiStyles();
    ensureToolButtonsCompact();
    ensureProjectControlsExist();
    ensureVariantNoiseControlsExist();

    if (!previewPanel) return;

    const injectedPanel = document.getElementById("pixelForgeInjectedEditPanel");

    undoButton = document.getElementById("undoButton");
    redoButton = document.getElementById("redoButton");
    historyStatus = document.getElementById("historyStatus");
    editPanelBlock = document.getElementById("editPanelBlock");

    const existingControlsPresent = !!(undoButton && redoButton && historyStatus);

    if (existingControlsPresent) {
        if (injectedPanel) {
            injectedPanel.remove();
        }

        const existingPanel =
            editPanelBlock ||
            undoButton.closest(".panelBlock") ||
            redoButton.closest(".panelBlock") ||
            historyStatus.closest(".panelBlock");

        if (existingPanel) {
            existingPanel.classList.add("pixelForgeCompactEditPanel");
            if (!existingPanel.id) {
                existingPanel.id = "editPanelBlock";
            }
            editPanelBlock = existingPanel;
        }

        historyStatus.classList.add("pixelForgeCompactHistory");
        setButtonHotkeyMarkup(undoButton, "Undo", "Ctrl+Z");
        setButtonHotkeyMarkup(redoButton, "Redo", "Ctrl+Y");

        if (!undoButton.dataset.boundUndo) {
            undoButton.onclick = () => undo();
            undoButton.dataset.boundUndo = "true";
        }

        if (!redoButton.dataset.boundRedo) {
            redoButton.onclick = () => redo();
            redoButton.dataset.boundRedo = "true";
        }

        return;
    }

    let panel = document.getElementById("pixelForgeInjectedEditPanel");

    if (!panel) {
        panel = document.createElement("div");
        panel.id = "pixelForgeInjectedEditPanel";
        panel.className = "panelBlock pixelForgeCompactEditPanel";
        panel.innerHTML = `
            <h3>Edit</h3>
            <div class="compactGrid">
                <button id="undoButton" class="pixelForgeHotkeyButton">
                    <span class="pixelForgeButtonMainLabel">Undo</span>
                    <span class="pixelForgeButtonHotkeyLabel">Ctrl+Z</span>
                </button>
                <button id="redoButton" class="pixelForgeHotkeyButton">
                    <span class="pixelForgeButtonMainLabel">Redo</span>
                    <span class="pixelForgeButtonHotkeyLabel">Ctrl+Y</span>
                </button>
            </div>
            <div id="historyStatus" class="pixelForgeCompactHistory">Undo 0 / Redo 0</div>
        `;
        const projectPanel = document.getElementById("pixelForgeProjectPanel");
        if (projectPanel && projectPanel.nextSibling) {
            previewPanel.insertBefore(panel, projectPanel.nextSibling);
        } else if (projectPanel) {
            previewPanel.appendChild(panel);
        } else {
            previewPanel.insertBefore(panel, previewPanel.firstChild);
        }
    }

    if (!panel.id) {
        panel.id = "editPanelBlock";
    }

    undoButton = document.getElementById("undoButton");
    redoButton = document.getElementById("redoButton");
    historyStatus = document.getElementById("historyStatus");
    editPanelBlock = document.getElementById("editPanelBlock");

    if (undoButton && !undoButton.dataset.boundUndo) {
        undoButton.onclick = () => undo();
        undoButton.dataset.boundUndo = "true";
    }

    if (redoButton && !redoButton.dataset.boundRedo) {
        redoButton.onclick = () => redo();
        redoButton.dataset.boundRedo = "true";
    }
}

function ensureLayerUtilityControlsExist() {
    if (!framesWorkspace) return;

    layerUtilityPanelBlock = document.getElementById("pixelForgeLayerUtilityPanel");
    mergeLayerButton = document.getElementById("pixelForgeMergeLayerButton");
    clearLayerButton = document.getElementById("pixelForgeClearLayerButton");
    duplicateLayerMiniButton = document.getElementById("pixelForgeDuplicateLayerButton");

    if (!layerUtilityPanelBlock) {
        layerUtilityPanelBlock = document.createElement("div");
        layerUtilityPanelBlock.id = "pixelForgeLayerUtilityPanel";
        layerUtilityPanelBlock.className = "panelBlock";
        layerUtilityPanelBlock.innerHTML = `
            <div class="pixelForgeLayerUtilityRow">
                <button id="pixelForgeMergeLayerButton" type="button">Merge</button>
                <button id="pixelForgeClearLayerButton" type="button">Clear</button>
                <button id="pixelForgeDuplicateLayerButton" type="button">L Dub</button>
            </div>
        `;

        if (advancedLayerPanelBlock && advancedLayerPanelBlock.parentNode) {
            advancedLayerPanelBlock.parentNode.insertBefore(layerUtilityPanelBlock, advancedLayerPanelBlock);
        } else {
            framesWorkspace.appendChild(layerUtilityPanelBlock);
        }
    }

    layerUtilityPanelBlock = document.getElementById("pixelForgeLayerUtilityPanel");
    mergeLayerButton = document.getElementById("pixelForgeMergeLayerButton");
    clearLayerButton = document.getElementById("pixelForgeClearLayerButton");
    duplicateLayerMiniButton = document.getElementById("pixelForgeDuplicateLayerButton");

    if (mergeLayerButton && !mergeLayerButton.dataset.boundMergeLayer) {
        mergeLayerButton.onclick = () => mergeLayerDown();
        mergeLayerButton.dataset.boundMergeLayer = "true";
    }

    if (clearLayerButton && !clearLayerButton.dataset.boundClearLayer) {
        clearLayerButton.onclick = () => clearActiveLayer();
        clearLayerButton.dataset.boundClearLayer = "true";
    }

    if (duplicateLayerMiniButton && !duplicateLayerMiniButton.dataset.boundDuplicateLayer) {
        duplicateLayerMiniButton.onclick = () => duplicateActiveLayer();
        duplicateLayerMiniButton.dataset.boundDuplicateLayer = "true";
    }
}

function ensureAdvancedLayerControlsExists() {
    if (!framesWorkspace) return;

    advancedLayerPanelBlock = document.getElementById("pixelForgeAdvancedLayerPanel");
    advancedLayerToggleButton = document.getElementById("pixelForgeAdvancedLayerToggle");
    advancedLayerControls = document.getElementById("pixelForgeAdvancedLayerControls");
    layerOpacitySlider = document.getElementById("pixelForgeLayerOpacitySlider");
    layerOpacityValue = document.getElementById("pixelForgeLayerOpacityValue");

    if (!advancedLayerPanelBlock) {
        advancedLayerPanelBlock = document.createElement("div");
        advancedLayerPanelBlock.id = "pixelForgeAdvancedLayerPanel";
        advancedLayerPanelBlock.className = "panelBlock";
        advancedLayerPanelBlock.innerHTML = `
            <button id="pixelForgeAdvancedLayerToggle" class="fullButton">Advanced Layer</button>
            <div id="pixelForgeAdvancedLayerControls" class="pixelForgeAdvancedLayerControls">
                <label class="miniLabel" for="pixelForgeLayerOpacitySlider">Layer Opacity</label>
                <div class="pixelForgeLayerOpacityRow">
                    <input id="pixelForgeLayerOpacitySlider" type="range" min="0" max="100" step="1" value="100">
                    <div id="pixelForgeLayerOpacityValue" class="pixelForgeLayerOpacityValue">100%</div>
                </div>
                <div class="pixelForgeAdvancedLayerHint">Affects the active layer only</div>
            </div>
        `;

        const toggleColorPanelBlock = toggleColorPanelButton ? toggleColorPanelButton.closest(".panelBlock") : null;

        if (toggleColorPanelBlock && toggleColorPanelBlock.parentNode) {
            toggleColorPanelBlock.parentNode.insertBefore(advancedLayerPanelBlock, toggleColorPanelBlock);
        } else {
            framesWorkspace.appendChild(advancedLayerPanelBlock);
        }
    }

    ensureLayerUtilityControlsExist();

    layerUtilityPanelBlock = document.getElementById("pixelForgeLayerUtilityPanel");
    advancedLayerPanelBlock = document.getElementById("pixelForgeAdvancedLayerPanel");

    if (layerUtilityPanelBlock && advancedLayerPanelBlock && layerUtilityPanelBlock.nextSibling !== advancedLayerPanelBlock) {
        advancedLayerPanelBlock.parentNode.insertBefore(layerUtilityPanelBlock, advancedLayerPanelBlock);
    }

    advancedLayerPanelBlock = document.getElementById("pixelForgeAdvancedLayerPanel");
    advancedLayerToggleButton = document.getElementById("pixelForgeAdvancedLayerToggle");
    advancedLayerControls = document.getElementById("pixelForgeAdvancedLayerControls");
    layerOpacitySlider = document.getElementById("pixelForgeLayerOpacitySlider");
    layerOpacityValue = document.getElementById("pixelForgeLayerOpacityValue");

    if (advancedLayerToggleButton && !advancedLayerToggleButton.dataset.boundAdvancedLayerToggle) {
        advancedLayerToggleButton.onclick = () => {
            advancedLayerControlsExpanded = !advancedLayerControlsExpanded;
            openFoldoutForElement(advancedLayerToggleButton);
            updateAdvancedLayerUI();
        };
        advancedLayerToggleButton.dataset.boundAdvancedLayerToggle = "true";
    }

    if (layerOpacitySlider && !layerOpacitySlider.dataset.boundLayerOpacityInput) {
        layerOpacitySlider.addEventListener("input", () => {
            setCurrentLayerOpacityFromPercent(layerOpacitySlider.value, false);
        });
        layerOpacitySlider.dataset.boundLayerOpacityInput = "true";
    }

    if (layerOpacitySlider && !layerOpacitySlider.dataset.boundLayerOpacityChange) {
        layerOpacitySlider.addEventListener("change", () => {
            setCurrentLayerOpacityFromPercent(layerOpacitySlider.value, true);
            layerOpacityInteractionSaved = false;
        });
        layerOpacitySlider.dataset.boundLayerOpacityChange = "true";
    }

    if (layerOpacitySlider && !layerOpacitySlider.dataset.boundLayerOpacityPointerDown) {
        const beginOpacityInteraction = () => {
            layerOpacityInteractionSaved = false;
        };

        layerOpacitySlider.addEventListener("mousedown", beginOpacityInteraction);
        layerOpacitySlider.addEventListener("touchstart", beginOpacityInteraction, { passive: true });
        layerOpacitySlider.dataset.boundLayerOpacityPointerDown = "true";
    }
}

function updateEditPanelVisibility() {
    ensureEditPanelExists();
    if (!editPanelBlock) return;
    editPanelBlock.style.display = frames.length > 1 ? "none" : "block";
}

function clampFrameDuration(value) {
    return clamp(Math.round(value), MIN_FRAME_DURATION, MAX_FRAME_DURATION);
}

function clampLayerOpacity(value) {
    return clamp(Math.round(value), MIN_LAYER_OPACITY, MAX_LAYER_OPACITY);
}

function opacityPercentToAlpha(value) {
    return clampLayerOpacity(value) / 100;
}

function alphaToOpacityPercent(value) {
    return clampLayerOpacity((Number.isFinite(value) ? value : 1) * 100);
}

function ensureFrameDuration(frame) {
    if (!frame) return MIN_FRAME_DURATION;
    frame.duration = clampFrameDuration(parseInt(frame.duration, 10) || 1);
    return frame.duration;
}

function ensureLayerOpacity(layer) {
    if (!layer) return 1;
    if (!Number.isFinite(layer.opacity)) {
        layer.opacity = 1;
        return layer.opacity;
    }

    layer.opacity = clamp(layer.opacity, 0, 1);
    return layer.opacity;
}

function sanitizeProjectGridSize(value) {
    const parsed = parseInt(value, 10);
    const allowedSizes = canvasSizeSelector
        ? [...canvasSizeSelector.options].map(option => parseInt(option.value, 10)).filter(Number.isFinite)
        : [16, 32, 64, 128];

    if (!Number.isFinite(parsed)) {
        return GRID_SIZE;
    }

    if (allowedSizes.includes(parsed)) {
        return parsed;
    }

    return GRID_SIZE;
}

function serializeLayer(layer) {
    return {
        name: typeof layer.name === "string" && layer.name.trim() ? layer.name : "Layer",
        visible: layer.visible !== false,
        locked: !!layer.locked,
        opacity: alphaToOpacityPercent(ensureLayerOpacity(layer)),
        grid: cloneGrid(layer.grid)
    };
}

function serializeFrame(frame) {
    return {
        duration: ensureFrameDuration(frame),
        layers: frame.layers.map(serializeLayer)
    };
}

function serializeCustomStampBrush() {
    if (!customStampBrush || !Array.isArray(customStampBrush.pixels) || !customStampBrush.pixels.length) {
        return null;
    }

    return {
        width: clamp(parseInt(customStampBrush.width, 10) || 1, 1, GRID_SIZE),
        height: clamp(parseInt(customStampBrush.height, 10) || 1, 1, GRID_SIZE),
        pixels: customStampBrush.pixels
            .map((pixel) => ({
                x: clamp(parseInt(pixel.x, 10) || 0, 0, GRID_SIZE - 1),
                y: clamp(parseInt(pixel.y, 10) || 0, 0, GRID_SIZE - 1),
                color: normalizeColor(pixel.color)
            }))
            .filter((pixel) => pixel.color)
    };
}

function normalizeCustomStampBrush(rawBrush, gridSize = GRID_SIZE) {
    if (!rawBrush || !Array.isArray(rawBrush.pixels) || !rawBrush.pixels.length) {
        return null;
    }

    const width = clamp(parseInt(rawBrush.width, 10) || 1, 1, gridSize);
    const height = clamp(parseInt(rawBrush.height, 10) || 1, 1, gridSize);

    const pixels = rawBrush.pixels
        .map((pixel) => ({
            x: clamp(parseInt(pixel?.x, 10) || 0, 0, width - 1),
            y: clamp(parseInt(pixel?.y, 10) || 0, 0, height - 1),
            color: normalizeColor(pixel?.color)
        }))
        .filter((pixel) => pixel.color);

    if (!pixels.length) {
        return null;
    }

    return {
        width,
        height,
        pixels
    };
}

function cloneCustomStampBrushData(source = customStampBrush) {
    if (!source || !Array.isArray(source.pixels) || !source.pixels.length) {
        return null;
    }

    return {
        width: source.width,
        height: source.height,
        pixels: source.pixels.map((pixel) => ({
            x: pixel.x,
            y: pixel.y,
            color: normalizeColor(pixel.color)
        }))
    };
}

function rebuildCustomBrushPixelCache() {
    if (!customStampBrush || !Array.isArray(customStampBrush.pixels) || !customStampBrush.pixels.length) {
        customBrushPixelCache = null;
        customBrushStampCacheCanvas = null;
        customBrushStampCacheRenderSize = 0;
        customBrushStampCacheSignature = "";
        customStampWorkerBusy = false;
        customStampWorkerPendingRedraw = false;
        return;
    }

    customBrushPixelCache = customStampBrush.pixels
        .map((pixel) => ({
            x: parseInt(pixel.x, 10) || 0,
            y: parseInt(pixel.y, 10) || 0,
            color: normalizeColor(pixel.color)
        }))
        .filter((pixel) => pixel.color);

    customBrushStampCacheCanvas = null;
    customBrushStampCacheRenderSize = 0;
    customBrushStampCacheSignature = "";
    customStampWorkerPendingRedraw = false;
}

function setCustomStampBrush(nextBrush) {
    customStampBrush = nextBrush ? cloneCustomStampBrushData(nextBrush) : null;
    rebuildCustomBrushPixelCache();
}

function syncCustomBrushToCurrentCanvasSize() {
    if (!customStampBrush) {
        customBrushPixelCache = null;
        return;
    }

    const normalizedBrush = normalizeCustomStampBrush(customStampBrush, GRID_SIZE);

    if (!normalizedBrush) {
        setCustomStampBrush(null);
        customBrushArmed = false;

        if (brushType === CUSTOM_BRUSH_TYPE) {
            brushType = "pixel";
        }

        return;
    }

    setCustomStampBrush(normalizedBrush);
}

function updateCustomBrushOption() {
    if (!brushSelect) return;

    let option = [...brushSelect.options].find((entry) => entry.value === CUSTOM_BRUSH_TYPE);

    if (!option) {
        option = document.createElement("option");
        option.value = CUSTOM_BRUSH_TYPE;
        brushSelect.appendChild(option);
    }

    if (customStampBrush && customStampBrush.pixels && customStampBrush.pixels.length) {
        option.textContent = `Custom Brush (${customStampBrush.width}x${customStampBrush.height})`;
    } else {
        option.textContent = "Custom Brush (arm with selection)";
    }
}

function unloadCustomBrush() {
    if (isPlaying) return;
    if (!customStampBrush || !customStampBrush.pixels || !customStampBrush.pixels.length) return;

    setCustomStampBrush(null);
    customBrushArmed = false;

    if (brushType === CUSTOM_BRUSH_TYPE) {
        brushType = "pixel";
    }

    updateBrushUI();
    refreshWorkspacePreview();
}

function buildCustomBrushFromSelectionPixels() {
    if (!selectionPixels.length || !selectionWidth || !selectionHeight) {
        return null;
    }

    let minX = selectionWidth;
    let minY = selectionHeight;
    let maxX = -1;
    let maxY = -1;

    for (const pixel of selectionPixels) {
        const color = pixel.topColor || getTopSelectionPixelColor(pixel);
        if (!color) continue;

        if (pixel.x < minX) minX = pixel.x;
        if (pixel.y < minY) minY = pixel.y;
        if (pixel.x > maxX) maxX = pixel.x;
        if (pixel.y > maxY) maxY = pixel.y;
    }

    if (maxX < minX || maxY < minY) {
        return null;
    }

    const pixels = [];

    for (const pixel of selectionPixels) {
        const color = pixel.topColor || getTopSelectionPixelColor(pixel);
        if (!color) continue;

        pixels.push({
            x: pixel.x - minX,
            y: pixel.y - minY,
            color: normalizeColor(color)
        });
    }

    if (!pixels.length) {
        return null;
    }

    return {
        width: maxX - minX + 1,
        height: maxY - minY + 1,
        pixels
    };
}

function getCustomBrushPixelsAt(x, y) {
    if (!customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return [];
    }

    const originX = x - Math.floor(customStampBrush.width / 2);
    const originY = y - Math.floor(customStampBrush.height / 2);

    const pixels = [];

    for (const pixel of customBrushPixelCache) {
        const drawX = originX + pixel.x;
        const drawY = originY + pixel.y;

        if (drawX < 0 || drawY < 0 || drawX >= GRID_SIZE || drawY >= GRID_SIZE) {
            continue;
        }

        pixels.push({
            x: drawX,
            y: drawY,
            color: pixel.color
        });
    }

    return pixels;
}

function stampCustomBrushAt(x, y, deferDisplayCachePatch = false) {
    if (!customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return false;
    }

    const activeLayer = getActiveLayer();
    if (!activeLayer || activeLayer.locked) {
        return false;
    }

    const grid = activeLayer.grid;
    const originX = x - Math.floor(customStampBrush.width / 2);
    const originY = y - Math.floor(customStampBrush.height / 2);
    let changed = false;

    for (let i = 0; i < customBrushPixelCache.length; i++) {
        const pixel = customBrushPixelCache[i];
        const drawX = originX + pixel.x;
        const drawY = originY + pixel.y;

        if (drawX < 0 || drawY < 0 || drawX >= GRID_SIZE || drawY >= GRID_SIZE) {
            continue;
        }

        if (grid[drawY][drawX] !== pixel.color) {
            grid[drawY][drawX] = pixel.color;
            changed = true;
        }
    }

    if (changed) {
        if (GRID_SIZE >= 256) {
            if (!deferDisplayCachePatch) {
                patchCurrentFrameDisplayCacheForCustomStamp(x, y);
            }
            markLayerRangeCacheDirtyDeferred();
        } else {
            currentFrameRenderCacheDirty = true;
            currentFrameLayerRangeCache.dirty = true;
        }

        expandActiveStrokeDirtyRectForCustomStamp(x, y);
    }

    return changed;
}

function shouldQueueCustomBrushStamps() {
    return brushType === CUSTOM_BRUSH_TYPE && GRID_SIZE >= 256;
}

function getQueuedCustomStampKey(x, y, mirror = false) {
    return `${x},${y},${mirror ? 1 : 0}`;
}

function getCustomStampFlushBatchSize() {
    const brushPixels = customBrushPixelCache ? customBrushPixelCache.length : 0;
    const queueDepth = pendingCustomStampQueue.length;

    if (GRID_SIZE >= 512) {
        let batchSize;

        if (brushPixels >= 192) {
            batchSize = 12;
        } else if (brushPixels >= 96) {
            batchSize = 16;
        } else if (brushPixels >= 48) {
            batchSize = 24;
        } else if (brushPixels >= 24) {
            batchSize = 32;
        } else {
            batchSize = 40;
        }

        if (queueDepth >= 512) {
            return Math.max(batchSize, 64);
        }

        if (queueDepth >= 256) {
            return Math.max(batchSize, 48);
        }

        if (queueDepth >= 128) {
            return Math.max(batchSize, 32);
        }

        return batchSize;
    }

    if (GRID_SIZE >= 256) {
        let batchSize;

        if (brushPixels >= 192) {
            batchSize = 16;
        } else if (brushPixels >= 96) {
            batchSize = 24;
        } else if (brushPixels >= 48) {
            batchSize = 32;
        } else {
            batchSize = 48;
        }

        if (queueDepth >= 384) {
            return Math.max(batchSize, 96);
        }

        if (queueDepth >= 192) {
            return Math.max(batchSize, 72);
        }

        return batchSize;
    }

    return Number.POSITIVE_INFINITY;
}

function enqueueCustomStamp(x, y, mirror = false) {
    const key = getQueuedCustomStampKey(x, y, mirror);

    if (pendingCustomStampKeySet.has(key)) {
        return;
    }

    pendingCustomStampKeySet.add(key);
    pendingCustomStampQueue.push({
        x,
        y,
        mirror: !!mirror,
        key
    });

    if (GRID_SIZE >= 512 && pendingCustomStampQueue.length > 256) {
        const keepCount = 160;
        const dropCount = pendingCustomStampQueue.length - keepCount;

        if (dropCount > 0) {
            const dropped = pendingCustomStampQueue.splice(0, dropCount);
            for (let i = 0; i < dropped.length; i++) {
                if (dropped[i].key) {
                    pendingCustomStampKeySet.delete(dropped[i].key);
                }
            }
        }
    }

    if (GRID_SIZE >= 256) {
        queueCustomStampFlush();
    }
}

function flushPendingCustomStamps(shouldRedraw = true) {
    if (!pendingCustomStampQueue.length) {
        customStampFlushQueued = false;
        return false;
    }

    let queue;
    const useChunkedFlush = GRID_SIZE >= 256;
    const batchSize = useChunkedFlush ? getCustomStampFlushBatchSize() : pendingCustomStampQueue.length;

    if (useChunkedFlush && pendingCustomStampQueue.length > batchSize) {
        queue = pendingCustomStampQueue.splice(0, batchSize);
    } else {
        queue = pendingCustomStampQueue;
        pendingCustomStampQueue = [];
    }

    for (let i = 0; i < queue.length; i++) {
        if (queue[i].key) {
            pendingCustomStampKeySet.delete(queue[i].key);
        }
    }

    customStampFlushQueued = false;

    let changed = false;

    if (GRID_SIZE >= 256) {
        changed = patchCurrentFrameDisplayCacheForQueuedCustomStamps(queue);
    } else {
        for (let i = 0; i < queue.length; i++) {
            const stamp = queue[i];

            if (stampCustomBrushAt(stamp.x, stamp.y, false)) {
                changed = true;
            }

            if (stamp.mirror) {
                const mirrorX = GRID_SIZE - 1 - stamp.x;
                if (mirrorX !== stamp.x && stampCustomBrushAt(mirrorX, stamp.y, false)) {
                    changed = true;
                }
            }
        }

        if (changed) {
            markCurrentFrameRenderCacheDirty();
        }
    }

    const skipImmediateRedrawDuringHeavyStroke =
        drawing &&
        pointerDownOnCanvas &&
        shouldQueueCustomBrushStamps();

    if (shouldRedraw && changed && !skipImmediateRedrawDuringHeavyStroke) {
        queueActiveStrokeRefresh();
    }

    if (pendingCustomStampQueue.length) {
        queueCustomStampFlush();
    }

    return changed;
}

function shouldDeferQueuedCustomStampBatchWork() {
    return (
        drawing &&
        pointerDownOnCanvas &&
        shouldQueueCustomBrushStamps() &&
        (
            customStampWorkerBusy ||
            pendingCustomBrushWorkerStampQueue.length > 0 ||
            !!pendingCustomBrushWorkerLineSegment ||
            pendingCustomBrushStrokePoints.length > 0
        )
    );
}

function queueCustomStampFlush() {
    if (customStampFlushQueued) {
        return;
    }

    customStampFlushQueued = true;

    requestAnimationFrame(() => {
        customStampFlushQueued = false;

        if (!pendingCustomStampQueue.length) {
            return;
        }

        if (shouldDeferQueuedCustomStampBatchWork()) {
            customStampBatchDeferQueued = true;
            queueCustomStampFlush();
            return;
        }

        customStampBatchDeferQueued = false;

        if (canUseCustomStampWorker()) {
            queueCustomStampWorkerFlush();
            return;
        }

        const frameBudgetMs = GRID_SIZE >= 512 ? 6 : 8;
        const startedAt = performance.now();
        let changed = false;

        do {
            if (flushPendingCustomStamps(false)) {
                changed = true;
            }
        } while (
            pendingCustomStampQueue.length &&
            performance.now() - startedAt < frameBudgetMs
        );

        if (changed) {
            queueActiveStrokeRefresh();
        }

        if (pendingCustomStampQueue.length) {
            queueCustomStampFlush();
        }
    });
}

function canUseCustomStampWorker() {
    return (
        GRID_SIZE >= 256 &&
        !!window.Worker &&
        !!window.Blob &&
        !!window.URL &&
        !!customStampBrush &&
        !!customBrushPixelCache &&
        !!customBrushPixelCache.length
    );
}

function ensureCustomStampWorker() {
    if (!canUseCustomStampWorker()) {
        return null;
    }

    if (customStampWorker) {
        return customStampWorker;
    }

    const workerSource = `
self.onmessage = function(event) {
    const data = event.data || {};
    const brush = data.brush || null;
    const gridSize = data.gridSize || 0;

    if (
        (data.type !== "mergeCustomStampBatch" && data.type !== "mergeCustomStampLine" && data.type !== "mergeCustomStampPoint") ||
        !brush ||
        !Array.isArray(brush.pixels) ||
        !brush.pixels.length ||
        !gridSize
    ) {
        self.postMessage({
            type: "mergeCustomStampResult",
            jobId: data.jobId,
            entries: [],
            minX: 0,
            minY: 0,
            maxX: -1,
            maxY: -1
        });
        return;
    }

    const pixelMap = new Map();
    let minX = gridSize;
    let minY = gridSize;
    let maxX = -1;
    let maxY = -1;
    const halfWidth = Math.floor(brush.width / 2);
    const halfHeight = Math.floor(brush.height / 2);

    function addStampPixels(stampX, stampY) {
        const originX = stampX - halfWidth;
        const originY = stampY - halfHeight;

        for (let i = 0; i < brush.pixels.length; i++) {
            const pixel = brush.pixels[i];
            const drawX = originX + pixel.x;
            const drawY = originY + pixel.y;

            if (drawX < 0 || drawY < 0 || drawX >= gridSize || drawY >= gridSize) {
                continue;
            }

            const key = drawY * gridSize + drawX;
            pixelMap.set(key, {
                x: drawX,
                y: drawY,
                color: pixel.color
            });

            if (drawX < minX) minX = drawX;
            if (drawY < minY) minY = drawY;
            if (drawX > maxX) maxX = drawX;
            if (drawY > maxY) maxY = drawY;
        }
    }

    function addLineSegment(x0, y0, x1, y1, mirror) {
        let dx = Math.abs(x1 - x0);
        let dy = Math.abs(y1 - y0);
        let sx = x0 < x1 ? 1 : -1;
        let sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;
        let stampedCount = 0;
        const maxSegmentStampCount = gridSize >= 512 ? 384 : 320;

        while (true) {
            addStampPixels(x0, y0);

            if (mirror) {
                const mirrorX = gridSize - 1 - x0;
                if (mirrorX !== x0) {
                    addStampPixels(mirrorX, y0);
                }
            }

            stampedCount += 1;

            if (x0 === x1 && y0 === y1) {
                break;
            }

            if (stampedCount >= maxSegmentStampCount) {
                break;
            }

            const e2 = 2 * err;

            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }

            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    if (data.type === "mergeCustomStampBatch") {
        const queue = Array.isArray(data.queue) ? data.queue : [];

        for (let i = 0; i < queue.length; i++) {
            const stamp = queue[i];
            addStampPixels(stamp.x, stamp.y);

            if (stamp.mirror) {
                const mirrorX = gridSize - 1 - stamp.x;
                if (mirrorX !== stamp.x) {
                    addStampPixels(mirrorX, stamp.y);
                }
            }
        }
    } else if (data.type === "mergeCustomStampPoint") {
        addStampPixels(data.x || 0, data.y || 0);

        if (data.mirror) {
            const mirrorX = gridSize - 1 - (data.x || 0);
            if (mirrorX !== (data.x || 0)) {
                addStampPixels(mirrorX, data.y || 0);
            }
        }
    } else {
        addLineSegment(
            data.x0 || 0,
            data.y0 || 0,
            data.x1 || 0,
            data.y1 || 0,
            !!data.mirror
        );
    }

    self.postMessage({
        type: "mergeCustomStampResult",
        jobId: data.jobId,
        entries: Array.from(pixelMap.values()),
        minX,
        minY,
        maxX,
        maxY
    });
};
`;

    const blob = new Blob([workerSource], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    URL.revokeObjectURL(workerUrl);

    worker.onmessage = (event) => {
        const data = event.data || {};
        if (data.type !== "mergeCustomStampResult") {
            return;
        }

        customStampWorkerBusy = false;

        const buffer = {
            pixelMap: new Map(),
            minX: data.minX,
            minY: data.minY,
            maxX: data.maxX,
            maxY: data.maxY
        };

        if (Array.isArray(data.entries)) {
            for (let i = 0; i < data.entries.length; i++) {
                const entry = data.entries[i];
                const key = entry.y * GRID_SIZE + entry.x;
                buffer.pixelMap.set(key, entry);
            }
        }

        const changed = applyMergedQueuedCustomStampBuffer(buffer);

        if (changed || customStampWorkerPendingRedraw) {
            customStampWorkerPendingRedraw = false;

            if (drawing && pointerDownOnCanvas) {
                queueActiveStrokeRefresh();
            } else {
                queueWorkspacePreviewRefresh();
            }
        }

        if (pendingCustomBrushWorkerLineSegment) {
            const pendingSegment = pendingCustomBrushWorkerLineSegment;
            pendingCustomBrushWorkerLineSegment = null;
            queueCustomBrushLineWorkerSegment(
                pendingSegment.x0,
                pendingSegment.y0,
                pendingSegment.x1,
                pendingSegment.y1,
                pendingSegment.mirror
            );
            return;
        }

        if (customStampBatchDeferQueued && pendingCustomStampQueue.length) {
            customStampBatchDeferQueued = false;
            queueCustomStampFlush();
            return;
        }

        if (pendingCustomStampQueue.length) {
            queueCustomStampFlush();
        }
    };

    customStampWorker = worker;
    customStampWorkerSupported = true;
    return customStampWorker;
}

function queueCustomStampWorkerFlush() {
    if (customStampWorkerBusy) {
        customStampWorkerPendingRedraw = true;
        return;
    }

    if (shouldDeferQueuedCustomStampBatchWork()) {
        customStampBatchDeferQueued = true;
        queueCustomStampFlush();
        return;
    }

    const worker = ensureCustomStampWorker();
    if (!worker) {
        const frameBudgetMs = GRID_SIZE >= 512 ? 6 : 8;
        const startedAt = performance.now();
        let changed = false;

        do {
            if (flushPendingCustomStamps(false)) {
                changed = true;
            }
        } while (
            pendingCustomStampQueue.length &&
            performance.now() - startedAt < frameBudgetMs
        );

        if (changed) {
            queueActiveStrokeRefresh();
        }

        if (pendingCustomStampQueue.length) {
            queueCustomStampFlush();
        }
        return;
    }

    if (!pendingCustomStampQueue.length) {
        return;
    }

    let queue;
    const batchSize = getCustomStampFlushBatchSize();

    if (pendingCustomStampQueue.length > batchSize) {
        queue = pendingCustomStampQueue.splice(0, batchSize);
    } else {
        queue = pendingCustomStampQueue;
        pendingCustomStampQueue = [];
    }

    for (let i = 0; i < queue.length; i++) {
        if (queue[i].key) {
            pendingCustomStampKeySet.delete(queue[i].key);
        }
    }

    customStampWorkerBusy = true;
    customStampWorkerJobId += 1;

    worker.postMessage({
        type: "mergeCustomStampBatch",
        jobId: customStampWorkerJobId,
        queue,
        gridSize: GRID_SIZE,
        brush: {
            width: customStampBrush.width,
            height: customStampBrush.height,
            pixels: customBrushPixelCache.map((pixel) => ({
                x: pixel.x,
                y: pixel.y,
                color: pixel.color
            }))
        }
    });
}

function queueCustomBrushLineWorkerSegment(x0, y0, x1, y1, mirror = false) {
    pendingCustomBrushWorkerLineSegment = null;
    pendingCustomBrushWorkerStampQueue = [];
    customStampWorkerPendingRedraw = false;

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let stampedCount = 0;
    const maxSegmentStampCount = GRID_SIZE >= 512 ? 384 : 320;
    const queue = [];

    while (true) {
        queue.push({
            x: x0,
            y: y0,
            mirror: !!mirror
        });
        stampedCount += 1;

        if (x0 === x1 && y0 === y1) {
            break;
        }

        if (stampedCount >= maxSegmentStampCount) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    const changed = applyMergedQueuedCustomStampBuffer(
        buildMergedQueuedCustomStampBuffer(queue)
    );

    if (changed) {
        queueActiveStrokeRefresh();
    }
}

function queueLiveCustomBrushStampFlush() {
    if (liveCustomBrushStampFlushQueued) {
        return;
    }

    liveCustomBrushStampFlushQueued = true;

    requestAnimationFrame(() => {
        liveCustomBrushStampFlushQueued = false;

        if (!pendingCustomBrushWorkerStampQueue.length) {
            return;
        }

        if (pendingCustomBrushWorkerLineSegment) {
            customStampWorkerPendingRedraw = true;
            queueLiveCustomBrushStampFlush();
            return;
        }

        const queue = pendingCustomBrushWorkerStampQueue;
        pendingCustomBrushWorkerStampQueue = [];

        const changed = applyMergedQueuedCustomStampBuffer(
            buildMergedQueuedCustomStampBuffer(queue)
        );

        if (changed || customStampWorkerPendingRedraw) {
            customStampWorkerPendingRedraw = false;

            if (drawing && pointerDownOnCanvas) {
                queueActiveStrokeRefresh();
            } else {
                queueWorkspacePreviewRefresh();
            }
        }

        if (pendingCustomBrushWorkerStampQueue.length) {
            queueLiveCustomBrushStampFlush();
        }
    });
}

function queueCustomBrushPointWorkerStamp(x, y, mirror = false) {
    const key = getQueuedCustomStampKey(x, y, mirror);

    for (let i = pendingCustomBrushWorkerStampQueue.length - 1; i >= 0; i--) {
        if (pendingCustomBrushWorkerStampQueue[i].key === key) {
            return;
        }
    }

    pendingCustomBrushWorkerStampQueue.push({
        x,
        y,
        mirror: !!mirror,
        key
    });

    queueLiveCustomBrushStampFlush();
}

function destroyCompositeRenderWorker() {
    if (compositeRenderWorker) {
        compositeRenderWorker.terminate();
        compositeRenderWorker = null;
    }

    compositeRenderWorkerReady = false;
    compositeRenderInFlight = false;
    compositeRenderPendingKey = "";
    compositeRenderCompletedKey = "";
    compositeRenderFallbackReason = "";

    if (compositeRenderBitmap) {
        try {
            compositeRenderBitmap.close();
        } catch (error) {
            // ignore bitmap close failures
        }
        compositeRenderBitmap = null;
    }
}

function canUseCompositeRenderWorker() {
    return compositeRenderWorkerSupported && !compositeRenderFallbackReason;
}

function ensureCompositeRenderWorker() {
    if (!canUseCompositeRenderWorker()) {
        return false;
    }

    if (compositeRenderWorker) {
        return true;
    }

    try {
        const workerSource = `
            let renderCanvas = null;
            let renderCtx = null;

            function ensureCanvas(width, height) {
                if (!renderCanvas || renderCanvas.width !== width || renderCanvas.height !== height) {
                    renderCanvas = new OffscreenCanvas(width, height);
                    renderCtx = renderCanvas.getContext("2d", { alpha: true, desynchronized: true });
                    renderCtx.imageSmoothingEnabled = false;
                }
            }

            function drawLayers(layers, displaySize, gridSize) {
                if (!layers || !layers.length) return;

                const cellSize = displaySize / gridSize;

                for (let i = 0; i < layers.length; i++) {
                    const layer = layers[i];
                    if (!layer || !layer.grid) continue;

                    const alpha = Number.isFinite(layer.opacity) ? Math.max(0, Math.min(1, layer.opacity)) : 1;
                    if (alpha <= 0) continue;

                    renderCtx.save();
                    renderCtx.globalAlpha = alpha;

                    for (let y = 0; y < gridSize; y++) {
                        const row = layer.grid[y];
                        if (!row) continue;

                        for (let x = 0; x < gridSize; x++) {
                            const color = row[x];
                            if (!color) continue;

                            const xStart = Math.floor(x * cellSize);
                            const xEnd = Math.floor((x + 1) * cellSize);
                            const yStart = Math.floor(y * cellSize);
                            const yEnd = Math.floor((y + 1) * cellSize);

                            renderCtx.fillStyle = color;
                            renderCtx.fillRect(
                                xStart,
                                yStart,
                                Math.max(1, xEnd - xStart),
                                Math.max(1, yEnd - yStart)
                            );
                        }
                    }

                    renderCtx.restore();
                }
            }

            function drawFrameSnapshot(frame, alpha, displaySize, gridSize) {
                if (!frame || !frame.layers || !frame.layers.length) return;

                renderCtx.save();
                renderCtx.globalAlpha = alpha;
                drawLayers(frame.layers, displaySize, gridSize);
                renderCtx.restore();
            }

            self.onmessage = (event) => {
                const data = event.data;

                if (!data || data.type !== "render") {
                    return;
                }

                try {
                    ensureCanvas(data.displaySize, data.displaySize);
                    renderCtx.clearRect(0, 0, data.displaySize, data.displaySize);

                    if (data.mode === "layerAware") {
                        drawLayers(data.lowerLayers, data.displaySize, data.gridSize);

                        if (data.previousFrame) {
                            drawFrameSnapshot(data.previousFrame, data.onionPrevAlpha, data.displaySize, data.gridSize);
                        }

                        if (data.nextFrame) {
                            drawFrameSnapshot(data.nextFrame, data.onionNextAlpha, data.displaySize, data.gridSize);
                        }

                        drawLayers(data.upperLayers, data.displaySize, data.gridSize);
                    } else {
                        if (data.previousFrame) {
                            drawFrameSnapshot(data.previousFrame, data.onionPrevAlpha, data.displaySize, data.gridSize);
                        }

                        if (data.nextFrame) {
                            drawFrameSnapshot(data.nextFrame, data.onionNextAlpha, data.displaySize, data.gridSize);
                        }

                        drawFrameSnapshot(data.currentFrame, 1, data.displaySize, data.gridSize);
                    }

                    const bitmap = renderCanvas.transferToImageBitmap();
                    self.postMessage({ type: "renderComplete", key: data.key, bitmap }, [bitmap]);
                } catch (error) {
                    self.postMessage({
                        type: "renderError",
                        message: error && error.message ? error.message : "Worker render failed."
                    });
                }
            };
        `;

        const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "application/javascript" }));
        compositeRenderWorker = new Worker(workerUrl);
        URL.revokeObjectURL(workerUrl);

        compositeRenderWorker.onmessage = (event) => {
            const data = event.data || {};

            if (data.type === "renderError") {
                compositeRenderFallbackReason = data.message || "Worker render failed.";
                destroyCompositeRenderWorker();
                refreshWorkspacePreview();
                return;
            }

            if (data.type !== "renderComplete") {
                return;
            }

            compositeRenderInFlight = false;
            compositeRenderWorkerReady = true;
            compositeRenderCompletedKey = data.key || "";

            if (compositeRenderBitmap) {
                try {
                    compositeRenderBitmap.close();
                } catch (error) {
                    // ignore bitmap close failures
                }
            }

            compositeRenderBitmap = data.bitmap || null;
            queueWorkspacePreviewRefresh();
        };

        compositeRenderWorker.onerror = () => {
            compositeRenderFallbackReason = "Worker initialization failed.";
            destroyCompositeRenderWorker();
            refreshWorkspacePreview();
        };

        compositeRenderWorkerReady = true;
        return true;
    } catch (error) {
        compositeRenderFallbackReason = error && error.message ? error.message : "Worker initialization failed.";
        destroyCompositeRenderWorker();
        return false;
    }
}

function createCompositeRenderLayerSnapshot(layer) {
    if (!layer || !layer.visible) return null;

    return {
        opacity: ensureLayerOpacity(layer),
        grid: layer.grid
    };
}

function createCompositeRenderFrameSnapshot(frame, startLayerIndex = 0, endLayerIndex = null) {
    if (!frame || !frame.layers || !frame.layers.length) {
        return null;
    }

    const maxIndex = frame.layers.length - 1;
    const safeStart = clamp(startLayerIndex, 0, maxIndex);
    const safeEnd = clamp(endLayerIndex === null ? maxIndex : endLayerIndex, 0, maxIndex);

    if (safeStart > safeEnd) {
        return { layers: [] };
    }

    const layers = [];

    for (let i = safeStart; i <= safeEnd; i++) {
        const snapshot = createCompositeRenderLayerSnapshot(frame.layers[i]);
        if (snapshot) {
            layers.push(snapshot);
        }
    }

    return { layers };
}

function getCompositeRenderStateKey() {
    return [
        GRID_SIZE,
        currentFrameIndex,
        currentLayerIndex,
        isPlaying ? 1 : 0,
        multiLayerModeEnabled ? 1 : 0,
        onionSkinEnabled ? 1 : 0,
        currentFrameRenderCacheDirty ? 1 : 0,
        currentFrameLayerRangeCache.dirty ? 1 : 0,
        layerRangeCacheDirtyDeferred ? 1 : 0,
        pendingCustomStampQueue.length,
        compositeContentRevision
    ].join("|");
}

function requestCompositeWorkerRender() {
    if (!ensureCompositeRenderWorker()) {
        return false;
    }

    const key = getCompositeRenderStateKey();

    if (compositeRenderInFlight && compositeRenderPendingKey === key) {
        return true;
    }

    if (compositeRenderCompletedKey === key && compositeRenderBitmap) {
        return true;
    }

    const currentFrame = getCurrentFrame();
    const previousFrame = onionSkinEnabled && currentFrameIndex > 0 ? frames[currentFrameIndex - 1] : null;
    const nextFrame = onionSkinEnabled && currentFrameIndex < frames.length - 1 ? frames[currentFrameIndex + 1] : null;
    const renderDisplaySize = getRenderDisplaySize();

    let payload;

    if (multiLayerModeEnabled && !isPlaying) {
        payload = {
            type: "render",
            key,
            mode: "layerAware",
            displaySize: renderDisplaySize,
            gridSize: GRID_SIZE,
            onionPrevAlpha: ONION_PREV_ALPHA,
            onionNextAlpha: ONION_NEXT_ALPHA,
            previousFrame: previousFrame ? createCompositeRenderFrameSnapshot(previousFrame) : null,
            nextFrame: nextFrame ? createCompositeRenderFrameSnapshot(nextFrame) : null,
            lowerLayers: createCompositeRenderFrameSnapshot(currentFrame, 0, currentLayerIndex - 1)?.layers || [],
            upperLayers: createCompositeRenderFrameSnapshot(currentFrame, currentLayerIndex, currentFrame.layers.length - 1)?.layers || []
        };
    } else {
        payload = {
            type: "render",
            key,
            mode: "normal",
            displaySize: renderDisplaySize,
            gridSize: GRID_SIZE,
            onionPrevAlpha: ONION_PREV_ALPHA,
            onionNextAlpha: ONION_NEXT_ALPHA,
            previousFrame: previousFrame ? createCompositeRenderFrameSnapshot(previousFrame) : null,
            nextFrame: nextFrame ? createCompositeRenderFrameSnapshot(nextFrame) : null,
            currentFrame: createCompositeRenderFrameSnapshot(currentFrame)
        };
    }

    compositeRenderInFlight = true;
    compositeRenderPendingKey = key;
    compositeRenderWorker.postMessage(payload);
    return true;
}

function drawCompositeWorkerBitmap(expectedKey = null) {
    if (!compositeRenderBitmap) {
        return false;
    }

    if (expectedKey && compositeRenderCompletedKey !== expectedKey) {
        return false;
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(compositeRenderBitmap, 0, 0);
    return true;
}

function createProjectData() {
    return {
        app: "Pixel Hammer",
        version: PROJECT_FILE_VERSION,
        savedAt: new Date().toISOString(),
        canvasSize: GRID_SIZE,
        frames: frames.map(serializeFrame),
        currentFrameIndex,
        currentLayerIndex,
        customStampBrush: serializeCustomStampBrush(),
        workspace: {
            currentWorkspaceMode,
            workspacePanelExpanded,
            colorPanelVisible,
            multiLayerModeEnabled,
            advancedLayerControlsExpanded,
            framesUnlocked,
            onionSkinEnabled,
            playbackMode,
            rectMode,
            noiseEnabled,
            noiseStrength,
            noiseDensity,
            variantIncludeNoise,
            brushType,
            lastStandardBrushType
        }
    };
}

function getDefaultProjectFilename() {
    return `pixel-hammer-project-${GRID_SIZE}x${GRID_SIZE}${PROJECT_FILE_EXTENSION}`;
}

function downloadTextFile(text, filename, mimeType = "text/plain") {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = filename;
    link.href = url;
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 0);
}

function exportProjectFile() {
    if (isPlaying || !frames.length) return;

    openFoldoutForElement(saveProjectButton || previewPanel);

    const projectData = createProjectData();
    const projectText = JSON.stringify(projectData, null, 2);

    downloadTextFile(projectText, getDefaultProjectFilename(), PROJECT_FILE_MIME);
}

function readTextFile(file, onSuccess) {
    const reader = new FileReader();

    reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : "";
        onSuccess(text);
    };

    reader.readAsText(file);
}

function validateProjectLayer(rawLayer, fallbackName, gridSize) {
    const safeGrid = [];

    for (let y = 0; y < gridSize; y++) {
        safeGrid[y] = [];
        for (let x = 0; x < gridSize; x++) {
            safeGrid[y][x] = null;
        }
    }

    const safeLayer = {
        name: typeof rawLayer?.name === "string" && rawLayer.name.trim() ? rawLayer.name : fallbackName,
        visible: rawLayer?.visible !== false,
        locked: !!rawLayer?.locked,
        opacity: opacityPercentToAlpha(rawLayer?.opacity),
        grid: safeGrid
    };

    const sourceGrid = rawLayer?.grid;
    if (!Array.isArray(sourceGrid) || sourceGrid.length !== gridSize) {
        return safeLayer;
    }

    for (let y = 0; y < gridSize; y++) {
        if (!Array.isArray(sourceGrid[y]) || sourceGrid[y].length !== gridSize) {
            return safeLayer;
        }

        for (let x = 0; x < gridSize; x++) {
            const value = sourceGrid[y][x];
            safeLayer.grid[y][x] = typeof value === "string" ? normalizeColor(value) : null;
        }
    }

    return safeLayer;
}

function validateProjectFrame(rawFrame, frameIndex, gridSize) {
    const rawLayers = Array.isArray(rawFrame?.layers) && rawFrame.layers.length
        ? rawFrame.layers
        : [null];

    return {
        duration: clampFrameDuration(rawFrame?.duration),
        layers: rawLayers.map((rawLayer, layerIndex) =>
            validateProjectLayer(rawLayer, `Layer ${layerIndex + 1}`, gridSize)
        )
    };
}

function normalizeProjectData(projectData) {
    if (!projectData || !Array.isArray(projectData.frames) || !projectData.frames.length) {
        throw new Error("Project file has no frames.");
    }

    const projectGridSize = sanitizeProjectGridSize(projectData.canvasSize);
    const normalizedFrames = projectData.frames.map((frame, index) =>
        validateProjectFrame(frame, index, projectGridSize)
    );

    const layerCount = normalizedFrames[0].layers.length;

    for (const frame of normalizedFrames) {
        if (frame.layers.length !== layerCount) {
            throw new Error("All frames must have the same number of layers.");
        }
    }

    const workspace = projectData.workspace || {};

    return {
        gridSize: projectGridSize,
        frames: normalizedFrames,
        currentFrameIndex: clamp(parseInt(projectData.currentFrameIndex, 10) || 0, 0, normalizedFrames.length - 1),
        currentLayerIndex: clamp(parseInt(projectData.currentLayerIndex, 10) || 0, 0, Math.max(0, layerCount - 1)),
        customStampBrush: normalizeCustomStampBrush(projectData.customStampBrush, projectGridSize),
        workspace: {
            currentWorkspaceMode: workspace.currentWorkspaceMode === "tileset" ? "tileset" : "frames",
            workspacePanelExpanded: !!workspace.workspacePanelExpanded,
            colorPanelVisible: workspace.colorPanelVisible !== false,
            multiLayerModeEnabled: !!workspace.multiLayerModeEnabled,
            advancedLayerControlsExpanded: !!workspace.advancedLayerControlsExpanded,
            framesUnlocked: !!workspace.framesUnlocked,
            onionSkinEnabled: workspace.onionSkinEnabled !== false,
            playbackMode: workspace.playbackMode === "pingpong" || workspace.playbackMode === "once"
                ? workspace.playbackMode
                : "loop",
            rectMode: workspace.rectMode === "fill" ? "fill" : "outline",
            noiseEnabled: !!workspace.noiseEnabled,
            noiseStrength: clamp(parseInt(workspace.noiseStrength, 10) || 28, MIN_NOISE_STRENGTH, MAX_NOISE_STRENGTH),
            noiseDensity: clamp(parseInt(workspace.noiseDensity, 10) || 72, MIN_NOISE_DENSITY, MAX_NOISE_DENSITY),
            variantIncludeNoise: !!workspace.variantIncludeNoise,
            brushType: workspace.brushType === CUSTOM_BRUSH_TYPE ? CUSTOM_BRUSH_TYPE : (typeof workspace.brushType === "string" ? workspace.brushType : "pixel"),
            lastStandardBrushType: typeof workspace.lastStandardBrushType === "string" ? workspace.lastStandardBrushType : "pixel"
        }
    };
}

function applyProjectData(projectState) {
    if (!projectState) return;

    stopPlayback(false);

    GRID_SIZE = projectState.gridSize;
    CELL_SIZE = getRenderDisplaySize() / GRID_SIZE;

    frames = cloneFramesData(projectState.frames);
    currentFrameIndex = projectState.currentFrameIndex;
    currentLayerIndex = projectState.currentLayerIndex;
    timelineStartIndex = 0;
    frameMoveSelectionIndex = currentFrameIndex;

    framesUnlocked = projectState.workspace.framesUnlocked;
    workspacePanelExpanded = projectState.workspace.workspacePanelExpanded;
    colorPanelVisible = projectState.workspace.colorPanelVisible;
    multiLayerModeEnabled = projectState.workspace.multiLayerModeEnabled;
    advancedLayerControlsExpanded = projectState.workspace.advancedLayerControlsExpanded;
    onionSkinEnabled = projectState.workspace.onionSkinEnabled;
    currentWorkspaceMode = projectState.workspace.currentWorkspaceMode;
    playbackMode = projectState.workspace.playbackMode;
    rectMode = projectState.workspace.rectMode;
    noiseEnabled = projectState.workspace.noiseEnabled;
    noiseStrength = projectState.workspace.noiseStrength;
    noiseDensity = projectState.workspace.noiseDensity;
    variantIncludeNoise = projectState.workspace.variantIncludeNoise;
    setCustomStampBrush(projectState.customStampBrush);
    syncCustomBrushToCurrentCanvasSize();
    customBrushArmed = false;
    lastStandardBrushType = projectState.workspace.lastStandardBrushType || "pixel";
    brushType = projectState.workspace.brushType === CUSTOM_BRUSH_TYPE ? CUSTOM_BRUSH_TYPE : projectState.workspace.brushType;

    if (brushType === CUSTOM_BRUSH_TYPE && (!customStampBrush || !customStampBrush.pixels || !customStampBrush.pixels.length)) {
        brushType = "pixel";
    }

    playbackDirection = 1;
    playbackTimelineFrozenIndex = currentFrameIndex;

    undoStack = [];
    redoStack = [];
    hoverPixel = null;
    ditherOrigin = null;
    layerOpacityInteractionSaved = false;
    layerRangeCacheDirtyDeferred = false;

    drawing = false;
    selecting = false;
    movingSelection = false;
    selectionDetachedFromCanvas = false;
    rectDrawing = false;
    rectStart = null;
    rectEnd = null;
    resetPointerStrokeState();

    clearSelection();
    clearLinePath();
    clearFrameDragState();
    clearCurrentFrameRenderCache();

    if (canvasSizeSelector) {
        canvasSizeSelector.value = String(GRID_SIZE);
    }

    if (playbackModeSelect) {
        playbackModeSelect.value = playbackMode;
    }

    if (rectModeSelect) {
        rectModeSelect.value = rectMode;
    }

    updateBrushUI();
    updateToolUI();
    ensureTimelineShowsFrame(currentFrameIndex);
    openFoldoutForElement(loadProjectButton || previewPanel);
    applyCanvasZoom();
    centerCanvasViewport();
    updateZoomLabel();
    updateFrameReorderUI();
    updateWorkspaceModeUI();
    updateOnionSkinUI();
    updateFrameUI();
    updatePlaybackUI();
    updateHistoryUI();
    updateLayerUI();
    updateNoiseUI();
    updateVariantNoiseUI();

    if (tileCtx && tileCanvas) {
        tileCtx.clearRect(0, 0, tileCanvas.width, tileCanvas.height);
    }

    requestAnimationFrame(() => {
        updateBrushUI();
        updateToolUI();
        forceImmediateCanvasRefresh();
    });
}

function importProjectText(projectText) {
    let parsed;

    try {
        parsed = JSON.parse(projectText);
    } catch (error) {
        alert("Project load failed. File is not valid JSON.");
        return;
    }

    const requestedGridSize = sanitizeProjectGridSize(parsed && parsed.canvasSize);

    if (Number.isFinite(requestedGridSize) && requestedGridSize !== GRID_SIZE) {
        GRID_SIZE = requestedGridSize;
        CELL_SIZE = getRenderDisplaySize() / GRID_SIZE;

        if (canvasSizeSelector) {
            canvasSizeSelector.value = String(GRID_SIZE);
        }

        applyCanvasZoom();
        updateZoomLabel();
    }

    let normalizedProject;

    try {
        normalizedProject = normalizeProjectData(parsed);
    } catch (error) {
        alert(`Project load failed. ${error.message}`);
        return;
    }

    applyProjectData(normalizedProject);
}

function importProjectFile(file) {
    if (!file || isPlaying) return;

    readTextFile(file, (text) => {
        importProjectText(text);
    });
}

function getCurrentFrameDuration() {
    return ensureFrameDuration(getCurrentFrame());
}

function getCurrentLayerOpacity() {
    const activeLayer = getActiveLayer();
    return ensureLayerOpacity(activeLayer);
}

function updateFrameDurationUI() {
    const duration = frames.length ? getCurrentFrameDuration() : 1;

    if (frameDurationInput) {
        frameDurationInput.value = duration;
        frameDurationInput.disabled = isPlaying;
    }

    if (frameDurationStatus) {
        frameDurationStatus.textContent = `Hold x${duration}`;
    }

    if (decreaseFrameDurationButton) {
        decreaseFrameDurationButton.disabled = isPlaying || duration <= MIN_FRAME_DURATION;
    }

    if (increaseFrameDurationButton) {
        increaseFrameDurationButton.disabled = isPlaying || duration >= MAX_FRAME_DURATION;
    }
}

function updateAdvancedLayerUI() {
    ensureAdvancedLayerControlsExists();

    if (!advancedLayerPanelBlock) return;

    const showAdvancedLayerPanel = currentWorkspaceMode === "frames" && multiLayerModeEnabled;
    advancedLayerPanelBlock.style.display = showAdvancedLayerPanel ? "block" : "none";

    if (layerUtilityPanelBlock) {
        layerUtilityPanelBlock.style.display = showAdvancedLayerPanel ? "block" : "none";
    }

    if (advancedLayerToggleButton) {
        advancedLayerToggleButton.textContent = advancedLayerControlsExpanded ? "Hide Advanced Layer" : "Advanced Layer";
        advancedLayerToggleButton.classList.toggle("activeTool", advancedLayerControlsExpanded);
    }

    if (advancedLayerControls) {
        advancedLayerControls.classList.toggle("expanded", advancedLayerControlsExpanded && showAdvancedLayerPanel);
    }

    const opacityPercent = alphaToOpacityPercent(getCurrentLayerOpacity());

    if (layerOpacitySlider) {
        layerOpacitySlider.value = opacityPercent;
        layerOpacitySlider.disabled = isPlaying || !showAdvancedLayerPanel;
    }

    if (layerOpacityValue) {
        layerOpacityValue.textContent = `${opacityPercent}%`;
    }

    if (duplicateLayerMiniButton) {
        duplicateLayerMiniButton.disabled = isPlaying || !multiLayerModeEnabled || currentLayerCount() >= MAX_LAYERS;
    }

    if (clearLayerButton) {
        clearLayerButton.disabled = isPlaying || !multiLayerModeEnabled || !frames.length || getActiveLayer().locked;
    }

    if (mergeLayerButton) {
        const activeLayer = frames.length ? getActiveLayer() : null;
        const canMerge =
            !isPlaying &&
            multiLayerModeEnabled &&
            !!activeLayer &&
            currentLayerIndex > 0 &&
            !activeLayer.locked &&
            !getLayerAtIndex(getCurrentFrame(), currentLayerIndex - 1)?.locked;

        mergeLayerButton.disabled = !canMerge;
    }
}

function setCurrentFrameDuration(value) {
    if (isPlaying || !frames.length) return;

    saveState();

    const duration = clampFrameDuration(parseInt(value, 10) || 1);
    getCurrentFrame().duration = duration;
    updateFrameDurationUI();
    renderFrameTimeline();
    updatePlaybackUI();
}

function setCurrentLayerOpacityFromPercent(value, isFinalCommit = false) {
    if (isPlaying || !frames.length || !multiLayerModeEnabled) return;

    const opacityPercent = clampLayerOpacity(parseInt(value, 10) || 0);
    const nextOpacity = opacityPercentToAlpha(opacityPercent);
    const activeLayer = getActiveLayer();

    if (!activeLayer) return;

    const currentOpacity = ensureLayerOpacity(activeLayer);

    if (Math.abs(currentOpacity - nextOpacity) < 0.0001) {
        updateAdvancedLayerUI();
        return;
    }

    if (!layerOpacityInteractionSaved) {
        saveState();
        layerOpacityInteractionSaved = true;
    }

    activeLayer.opacity = nextOpacity;
    markCurrentFrameRenderCacheDirty();
    updateAdvancedLayerUI();
    updateLayerUI();
    queueTimelineRefresh();
    refreshWorkspacePreview();

    if (isFinalCommit) {
        updateHistoryUI();
    }
}

function stepCurrentFrameDuration(direction) {
    if (!frames.length) return;
    setCurrentFrameDuration(getCurrentFrameDuration() + direction);
}

function createBlankGrid() {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        grid[y] = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            grid[y][x] = null;
        }
    }
    return grid;
}

function cloneGrid(grid) {
    return grid.map(row => [...row]);
}

function createLayer(name = null, grid = null, opacity = 1) {
    return {
        name: name || `Layer ${currentLayerCount() + 1}`,
        visible: true,
        locked: false,
        opacity: clamp(opacity, 0, 1),
        grid: grid ? cloneGrid(grid) : createBlankGrid()
    };
}

function cloneLayer(layer) {
    return {
        name: layer.name,
        visible: layer.visible,
        locked: layer.locked,
        opacity: ensureLayerOpacity(layer),
        grid: cloneGrid(layer.grid)
    };
}

function createFrameDataFromLayerTemplate(templateLayers = null) {
    if (templateLayers && templateLayers.length) {
        return {
            duration: 1,
            layers: templateLayers.map(layer => ({
                name: layer.name,
                visible: layer.visible,
                locked: layer.locked,
                opacity: ensureLayerOpacity(layer),
                grid: createBlankGrid()
            }))
        };
    }

    return {
        duration: 1,
        layers: [createLayer("Layer 1")]
    };
}

function cloneFrameData(frame) {
    return {
        duration: ensureFrameDuration(frame),
        layers: frame.layers.map(cloneLayer)
    };
}

function cloneFramesData(frameList) {
    return frameList.map(cloneFrameData);
}

function createHistoryState() {
    return {
        frames: cloneFramesData(frames),
        currentFrameIndex,
        currentLayerIndex,
        timelineStartIndex,
        frameMoveSelectionIndex,
        framesUnlocked,
        workspacePanelExpanded,
        colorPanelVisible,
        multiLayerModeEnabled,
        advancedLayerControlsExpanded,
        onionSkinEnabled,
        currentWorkspaceMode,
        playbackMode,
        rectMode,
        noiseEnabled,
        noiseStrength,
        noiseDensity,
        variantIncludeNoise,
        brushType,
        lastStandardBrushType,
        customStampBrush: cloneCustomStampBrushData()
    };
}

function markCurrentFrameRenderCacheDirty() {
    currentFrameRenderCacheDirty = true;
    currentFrameLayerRangeCache.dirty = true;
    compositeContentRevision += 1;
}

function markLayerRangeCacheDirtyDeferred() {
    layerRangeCacheDirtyDeferred = true;
    compositeContentRevision += 1;
}

function flushDeferredLayerRangeCacheDirty() {
    if (!layerRangeCacheDirtyDeferred) return;
    currentFrameLayerRangeCache.dirty = true;
    layerRangeCacheDirtyDeferred = false;
}

function expandActiveStrokeDirtyRect(minX, minY, maxX, maxY) {
    const clampedMinX = clamp(minX, 0, GRID_SIZE - 1);
    const clampedMinY = clamp(minY, 0, GRID_SIZE - 1);
    const clampedMaxX = clamp(maxX, 0, GRID_SIZE - 1);
    const clampedMaxY = clamp(maxY, 0, GRID_SIZE - 1);

    if (clampedMaxX < clampedMinX || clampedMaxY < clampedMinY) {
        return;
    }

    if (!activeStrokeDirtyRect) {
        activeStrokeDirtyRect = {
            minX: clampedMinX,
            minY: clampedMinY,
            maxX: clampedMaxX,
            maxY: clampedMaxY
        };
        return;
    }

    activeStrokeDirtyRect.minX = Math.min(activeStrokeDirtyRect.minX, clampedMinX);
    activeStrokeDirtyRect.minY = Math.min(activeStrokeDirtyRect.minY, clampedMinY);
    activeStrokeDirtyRect.maxX = Math.max(activeStrokeDirtyRect.maxX, clampedMaxX);
    activeStrokeDirtyRect.maxY = Math.max(activeStrokeDirtyRect.maxY, clampedMaxY);
}

function expandActiveStrokeDirtyRectForCustomStamp(x, y) {
    if (!customStampBrush) return;
    if (GRID_SIZE < 256) return;

    const originX = x - Math.floor(customStampBrush.width / 2);
    const originY = y - Math.floor(customStampBrush.height / 2);

    expandActiveStrokeDirtyRect(
        originX,
        originY,
        originX + customStampBrush.width - 1,
        originY + customStampBrush.height - 1
    );
}

function clearActiveStrokeDirtyRect() {
    activeStrokeDirtyRect = null;
}

function getActiveStrokeDirtyDisplayRect() {
    if (!activeStrokeDirtyRect) return null;

    const padding = 2;
    const renderDisplaySize = getRenderDisplaySize();
    const startX = Math.max(0, Math.floor(activeStrokeDirtyRect.minX * CELL_SIZE) - padding);
    const startY = Math.max(0, Math.floor(activeStrokeDirtyRect.minY * CELL_SIZE) - padding);
    const endX = Math.min(renderDisplaySize, Math.ceil((activeStrokeDirtyRect.maxX + 1) * CELL_SIZE) + padding);
    const endY = Math.min(renderDisplaySize, Math.ceil((activeStrokeDirtyRect.maxY + 1) * CELL_SIZE) + padding);

    return {
        x: startX,
        y: startY,
        width: Math.max(0, endX - startX),
        height: Math.max(0, endY - startY)
    };
}

function clearCurrentFrameRenderCache() {
    currentFrameRenderCacheCanvas = null;
    currentFrameRenderCacheCtx = null;
    currentFrameRenderCacheFrameIndex = -1;
    currentFrameRenderCacheDirty = true;

    currentFrameLayerRangeCache.lowerCanvas = null;
    currentFrameLayerRangeCache.upperCanvas = null;
    currentFrameLayerRangeCache.frameIndex = -1;
    currentFrameLayerRangeCache.splitLayerIndex = -1;
    currentFrameLayerRangeCache.dirty = true;

    customStampWorkerPendingRedraw = false;
    compositeRenderCompletedKey = "";
    compositeRenderPendingKey = "";

    if (compositeRenderBitmap) {
        try {
            compositeRenderBitmap.close();
        } catch (error) {
            // ignore bitmap close failures
        }
        compositeRenderBitmap = null;
    }
}

function canPatchCurrentFrameDisplayCacheDirectly() {
    return (
        currentFrameRenderCacheCanvas &&
        currentFrameRenderCacheFrameIndex === currentFrameIndex &&
        !currentFrameRenderCacheDirty
    );
}

function patchCurrentFrameDisplayCachePixel(x, y, color) {
    if (!canPatchCurrentFrameDisplayCacheDirectly()) return false;

    const cacheCtx = currentFrameRenderCacheCtx;
    if (!cacheCtx) return false;

    const renderCellSize = getRenderCellSize();
    const xStart = Math.floor(x * renderCellSize);
    const xEnd = Math.floor((x + 1) * renderCellSize);
    const yStart = Math.floor(y * renderCellSize);
    const yEnd = Math.floor((y + 1) * renderCellSize);
    const width = Math.max(1, xEnd - xStart);
    const height = Math.max(1, yEnd - yStart);

    if (color === null) {
        cacheCtx.clearRect(xStart, yStart, width, height);
        return true;
    }

    cacheCtx.fillStyle = color;
    cacheCtx.fillRect(xStart, yStart, width, height);
    return true;
}

function getCurrentFrameDisplayCacheContext() {
    if (!canPatchCurrentFrameDisplayCacheDirectly()) {
        return null;
    }

    return currentFrameRenderCacheCtx;
}

function patchCustomStampToDisplayCacheContext(cacheCtx, x, y, state = null) {
    if (!cacheCtx || !customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return false;
    }

    const renderCellSize = getRenderCellSize();
    const stampWidth = Math.max(1, Math.round(customStampBrush.width * renderCellSize));
    const stampHeight = Math.max(1, Math.round(customStampBrush.height * renderCellSize));
    const signature = `${stampWidth}x${stampHeight}:${customBrushPixelCache.map((pixel) => `${pixel.x},${pixel.y},${pixel.color}`).join("|")}`;

    if (
        !customBrushStampCacheCanvas ||
        customBrushStampCacheRenderSize !== renderCellSize ||
        customBrushStampCacheSignature !== signature
    ) {
        const stampCanvas = document.createElement("canvas");
        const stampCtx = stampCanvas.getContext("2d");

        stampCanvas.width = stampWidth;
        stampCanvas.height = stampHeight;
        stampCtx.clearRect(0, 0, stampWidth, stampHeight);
        stampCtx.imageSmoothingEnabled = false;

        for (let i = 0; i < customBrushPixelCache.length; i++) {
            const pixel = customBrushPixelCache[i];
            const xStart = Math.floor(pixel.x * renderCellSize);
            const xEnd = Math.floor((pixel.x + 1) * renderCellSize);
            const yStart = Math.floor(pixel.y * renderCellSize);
            const yEnd = Math.floor((pixel.y + 1) * renderCellSize);
            const width = Math.max(1, xEnd - xStart);
            const height = Math.max(1, yEnd - yStart);

            stampCtx.fillStyle = pixel.color;
            stampCtx.fillRect(xStart, yStart, width, height);
        }

        customBrushStampCacheCanvas = stampCanvas;
        customBrushStampCacheRenderSize = renderCellSize;
        customBrushStampCacheSignature = signature;
    }

    const originX = x - Math.floor(customStampBrush.width / 2);
    const originY = y - Math.floor(customStampBrush.height / 2);
    const drawX = Math.floor(originX * renderCellSize);
    const drawY = Math.floor(originY * renderCellSize);

    cacheCtx.drawImage(customBrushStampCacheCanvas, drawX, drawY);

    if (state) {
        state.lastFillStyle = null;
    }

    return true;
}

function patchCurrentFrameDisplayCacheForCustomStamp(x, y) {
    const cacheCtx = getCurrentFrameDisplayCacheContext();
    if (!cacheCtx) {
        return false;
    }

    return patchCustomStampToDisplayCacheContext(cacheCtx, x, y);
}

function buildMergedQueuedCustomStampBuffer(queue) {
    if (!queue || !queue.length || !customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return null;
    }

    const pixelMap = new Map();
    let minX = GRID_SIZE;
    let minY = GRID_SIZE;
    let maxX = -1;
    let maxY = -1;

    const addStampPixels = (stampX, stampY) => {
        const originX = stampX - Math.floor(customStampBrush.width / 2);
        const originY = stampY - Math.floor(customStampBrush.height / 2);

        for (let i = 0; i < customBrushPixelCache.length; i++) {
            const pixel = customBrushPixelCache[i];
            const drawX = originX + pixel.x;
            const drawY = originY + pixel.y;

            if (drawX < 0 || drawY < 0 || drawX >= GRID_SIZE || drawY >= GRID_SIZE) {
                continue;
            }

            const key = drawY * GRID_SIZE + drawX;
            pixelMap.set(key, {
                x: drawX,
                y: drawY,
                color: pixel.color
            });

            if (drawX < minX) minX = drawX;
            if (drawY < minY) minY = drawY;
            if (drawX > maxX) maxX = drawX;
            if (drawY > maxY) maxY = drawY;
        }
    };

    for (let i = 0; i < queue.length; i++) {
        const stamp = queue[i];
        addStampPixels(stamp.x, stamp.y);

        if (stamp.mirror) {
            const mirrorX = GRID_SIZE - 1 - stamp.x;
            if (mirrorX !== stamp.x) {
                addStampPixels(mirrorX, stamp.y);
            }
        }
    }

    if (!pixelMap.size) {
        return null;
    }

    return {
        pixelMap,
        minX,
        minY,
        maxX,
        maxY
    };
}

function applyMergedQueuedCustomStampBuffer(buffer) {
    if (!buffer || !buffer.pixelMap || !buffer.pixelMap.size) {
        return false;
    }

    const activeLayer = getActiveLayer();
    if (!activeLayer || activeLayer.locked) {
        return false;
    }

    const grid = activeLayer.grid;
    const cacheCtx = GRID_SIZE >= 256 ? getCurrentFrameDisplayCacheContext() : null;
    const renderCellSize = getRenderCellSize();

    let changed = false;
    let lastFillStyle = null;

    if (cacheCtx) {
        cacheCtx.save();
        cacheCtx.imageSmoothingEnabled = false;
    }

    for (const pixel of buffer.pixelMap.values()) {
        if (grid[pixel.y][pixel.x] === pixel.color) {
            continue;
        }

        grid[pixel.y][pixel.x] = pixel.color;
        changed = true;

        if (cacheCtx) {
            const xStart = Math.floor(pixel.x * renderCellSize);
            const xEnd = Math.floor((pixel.x + 1) * renderCellSize);
            const yStart = Math.floor(pixel.y * renderCellSize);
            const yEnd = Math.floor((pixel.y + 1) * renderCellSize);
            const width = Math.max(1, xEnd - xStart);
            const height = Math.max(1, yEnd - yStart);

            if (pixel.color !== lastFillStyle) {
                cacheCtx.fillStyle = pixel.color;
                lastFillStyle = pixel.color;
            }

            cacheCtx.fillRect(xStart, yStart, width, height);
        }
    }

    if (cacheCtx) {
        cacheCtx.restore();
    }

    if (!changed) {
        return false;
    }

    if (GRID_SIZE >= 256) {
        if (!cacheCtx) {
            currentFrameRenderCacheDirty = true;
        }

        markLayerRangeCacheDirtyDeferred();
        expandActiveStrokeDirtyRect(buffer.minX, buffer.minY, buffer.maxX, buffer.maxY);
    } else {
        markCurrentFrameRenderCacheDirty();
    }

    return true;
}

function patchCurrentFrameDisplayCacheForQueuedCustomStamps(queue) {
    if (!queue || !queue.length) {
        return false;
    }

    const buffer = buildMergedQueuedCustomStampBuffer(queue);
    return applyMergedQueuedCustomStampBuffer(buffer);
}

function getVisibleCompositeColorAt(x, y) {
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) {
        return null;
    }

    const frame = getCurrentFrame();

    for (let i = frame.layers.length - 1; i >= 0; i--) {
        const layer = frame.layers[i];
        if (!layer.visible) continue;

        const color = layer.grid[y][x];
        if (color !== null) {
            return color;
        }
    }

    return null;
}

function canFastPatchActiveLayerColorAt(x, y) {
    const activeLayer = getActiveLayer();

    if (!activeLayer || !activeLayer.visible) {
        return false;
    }

    if (ensureLayerOpacity(activeLayer) < 1) {
        return false;
    }

    const activeColor = activeLayer.grid[y][x];
    if (activeColor === null) {
        return false;
    }

    const frame = getCurrentFrame();

    for (let i = frame.layers.length - 1; i > currentLayerIndex; i--) {
        const layer = frame.layers[i];
        if (!layer.visible) continue;
        if (ensureLayerOpacity(layer) <= 0) continue;
        return false;
    }

    return true;
}

function patchCurrentFrameDisplayCacheForPixel(x, y) {
    if (!canPatchCurrentFrameDisplayCacheDirectly()) {
        return false;
    }

    if (canFastPatchActiveLayerColorAt(x, y)) {
        return patchCurrentFrameDisplayCachePixel(x, y, getActiveLayer().grid[y][x]);
    }

    return patchCurrentFrameDisplayCachePixel(x, y, getVisibleCompositeColorAt(x, y));
}

function queueWorkspacePreviewRefresh() {
    if (workspacePreviewQueued) return;
    workspacePreviewQueued = true;

    requestAnimationFrame(() => {
        workspacePreviewQueued = false;
        drawCanvas();
    });
}

function queueTimelineRefresh() {
    if (isPlaying) return;

    if (drawing || selecting || movingSelection || rectDrawing) {
        return;
    }

    if (timelineRefreshQueued) return;
    timelineRefreshQueued = true;

    requestAnimationFrame(() => {
        timelineRefreshQueued = false;

        if (drawing || selecting || movingSelection || rectDrawing) {
            return;
        }

        timelineRefreshDeferred = false;
        renderFrameTimeline();
    });
}

function queuePlaybackFrameDraw() {
    if (playbackFrameDrawQueued) return;
    playbackFrameDrawQueued = true;

    requestAnimationFrame(() => {
        playbackFrameDrawQueued = false;
        drawCanvas();
    });
}

function getActiveStrokeRefreshInterval() {
    if (GRID_SIZE >= 512) return 16;
    if (GRID_SIZE >= 256) return 16;
    if (GRID_SIZE >= 128) return 12;
    return 0;
}

function queueActiveStrokeRefresh() {
    const minInterval = getActiveStrokeRefreshInterval();

    if (minInterval <= 0) {
        if (activeStrokeRefreshQueued) return;
        activeStrokeRefreshQueued = true;

        requestAnimationFrame(() => {
            activeStrokeRefreshQueued = false;
            lastActiveStrokeRefreshAt = performance.now();
            activeStrokeRefreshPending = false;
            drawCanvas();
        });
        return;
    }

    const now = performance.now();
    const elapsed = now - lastActiveStrokeRefreshAt;

    if (!activeStrokeRefreshQueued && elapsed >= minInterval) {
        activeStrokeRefreshQueued = true;

        requestAnimationFrame(() => {
            activeStrokeRefreshQueued = false;
            lastActiveStrokeRefreshAt = performance.now();
            activeStrokeRefreshPending = false;
            drawCanvas();
        });
        return;
    }

    activeStrokeRefreshPending = true;

    if (activeStrokeRefreshTimer !== null) return;

    const wait = Math.max(0, minInterval - elapsed);

    activeStrokeRefreshTimer = window.setTimeout(() => {
        activeStrokeRefreshTimer = null;

        if (!activeStrokeRefreshPending || activeStrokeRefreshQueued) return;

        activeStrokeRefreshQueued = true;
        requestAnimationFrame(() => {
            activeStrokeRefreshQueued = false;
            lastActiveStrokeRefreshAt = performance.now();
            activeStrokeRefreshPending = false;
            drawCanvas();
        });
    }, wait);
}

function forceImmediateCanvasRefresh() {
    workspacePreviewQueued = false;
    playbackFrameDrawQueued = false;
    activeStrokeRefreshQueued = false;
    activeStrokeRefreshPending = false;
    customStampWorkerPendingRedraw = false;
    pendingCustomBrushWorkerStampQueue = [];
    liveCustomBrushStampFlushQueued = false;
    pendingCustomBrushWorkerLineSegment = null;
    customStampBatchDeferQueued = false;
    customBrushStrokePumpQueued = false;
    pendingCustomBrushStrokePoints = [];
    compositeRenderPendingKey = "";
    compositeRenderCompletedKey = "";

    if (activeStrokeRefreshTimer !== null) {
        clearTimeout(activeStrokeRefreshTimer);
        activeStrokeRefreshTimer = null;
    }

    if (compositeRenderBitmap) {
        try {
            compositeRenderBitmap.close();
        } catch (error) {
            // ignore bitmap close failures
        }
        compositeRenderBitmap = null;
    }

    flushDeferredLayerRangeCacheDirty();
    lastActiveStrokeRefreshAt = performance.now();
    drawCanvas();
    clearActiveStrokeDirtyRect();
    renderPreviewOverlay();
}

function ensurePreviewOverlayCanvas() {
    if (previewOverlayCanvas || !canvasContainer) return;

    const renderDisplaySize = getRenderDisplaySize();

    previewOverlayCanvas = document.createElement("canvas");
    previewOverlayCanvas.id = "pixelForgePreviewOverlay";
    previewOverlayCanvas.width = renderDisplaySize;
    previewOverlayCanvas.height = renderDisplaySize;
    previewOverlayCanvas.style.position = "absolute";
    previewOverlayCanvas.style.left = "50%";
    previewOverlayCanvas.style.top = "50%";
    previewOverlayCanvas.style.transform = "translate(-50%, -50%)";
    previewOverlayCanvas.style.pointerEvents = "none";
    previewOverlayCanvas.style.zIndex = "2";
    previewOverlayCanvas.style.imageRendering = "pixelated";
    previewOverlayCanvas.style.display = "block";

    previewOverlayCtx = previewOverlayCanvas.getContext("2d");
    if (previewOverlayCtx) {
        previewOverlayCtx.imageSmoothingEnabled = false;
    }

    canvasContainer.appendChild(previewOverlayCanvas);
    syncPreviewOverlayCanvasSize();
}

function syncPreviewOverlayCanvasSize(forcedSize = null, forcedRenderDisplaySize = null) {
    ensurePreviewOverlayCanvas();
    if (!previewOverlayCanvas) return;

    const scaledSize = forcedSize || getScaledCanvasSize();
    const renderDisplaySize = forcedRenderDisplaySize || getRenderDisplaySize();

    previewOverlayCanvas.width = renderDisplaySize;
    previewOverlayCanvas.height = renderDisplaySize;
    previewOverlayCanvas.style.width = `${scaledSize}px`;
    previewOverlayCanvas.style.height = `${scaledSize}px`;
    previewOverlayCanvas.style.left = "50%";
    previewOverlayCanvas.style.top = "50%";
    previewOverlayCanvas.style.transform = "translate(-50%, -50%)";

    if (previewOverlayCtx) {
        previewOverlayCtx.imageSmoothingEnabled = false;
    }
}

function clearPreviewOverlay() {
    ensurePreviewOverlayCanvas();
    if (!previewOverlayCtx || !previewOverlayCanvas) return;
    previewOverlayCtx.clearRect(0, 0, previewOverlayCanvas.width, previewOverlayCanvas.height);
}

function renderPreviewOverlay() {
    ensurePreviewOverlayCanvas();
    clearPreviewOverlay();

    if (isPlaying) return;
    if (selecting || movingSelection || rectDrawing) return;
    if (drawing && pointerDownOnCanvas) return;

    drawBrushPreview(previewOverlayCtx);
}

function queuePreviewOverlayRefresh() {
    ensurePreviewOverlayCanvas();

    if (previewOverlayQueued) return;
    previewOverlayQueued = true;

    requestAnimationFrame(() => {
        previewOverlayQueued = false;

        if (
            currentFrameRenderCacheDirty ||
            layerRangeCacheDirtyDeferred ||
            !!activeStrokeDirtyRect ||
            pendingCustomStampQueue.length ||
            pendingCustomBrushWorkerStampQueue.length ||
            customStampWorkerPendingRedraw
        ) {
            queueWorkspacePreviewRefresh();
        }

        renderPreviewOverlay();
    });
}

function forceImmediatePreviewRefresh() {
    workspacePreviewQueued = false;
    playbackFrameDrawQueued = false;
    activeStrokeRefreshQueued = false;
    activeStrokeRefreshPending = false;

    if (activeStrokeRefreshTimer !== null) {
        clearTimeout(activeStrokeRefreshTimer);
        activeStrokeRefreshTimer = null;
    }

    if (
        currentFrameRenderCacheDirty ||
        layerRangeCacheDirtyDeferred ||
        pendingCustomStampQueue.length
    ) {
        forceImmediateCanvasRefresh();
        return;
    }

    const renderDisplaySize = getRenderDisplaySize();

    lastActiveStrokeRefreshAt = performance.now();

    ctx.clearRect(0, 0, renderDisplaySize, renderDisplaySize);

    if (multiLayerModeEnabled && !isPlaying) {
        drawCurrentPixelsLayerAware();
    } else {
        drawOnionSkin();
        drawCurrentPixels();
    }

    if (gridVisible) {
        drawGrid();
    }

    if (!isPlaying) {
        drawSelectionOverlay();
        drawBrushPreview();
        drawLinePreview();
        drawRectPreview();
        drawEllipsePreview();
    }

    clearActiveStrokeDirtyRect();
}

function flushDeferredTimelineRefresh() {
    if (timelineRefreshQueued) return;
    if (!timelineRefreshDeferred) return;
    if (drawing || selecting || movingSelection || rectDrawing || isPlaying) return;

    timelineRefreshDeferred = false;
    renderFrameTimeline();
}

function syncFrameMoveSelectionToCurrentFrame() {
    if (!frames.length) {
        frameMoveSelectionIndex = 0;
        return;
    }

    frameMoveSelectionIndex = clamp(currentFrameIndex, 0, frames.length - 1);
}

function applyHistoryState(state) {
    if (!state || !state.frames || !state.frames.length) return;

    frames = cloneFramesData(state.frames);
    currentFrameIndex = clamp(state.currentFrameIndex ?? 0, 0, frames.length - 1);
    currentLayerIndex = clamp(
        state.currentLayerIndex ?? 0,
        0,
        Math.max(0, frames[currentFrameIndex].layers.length - 1)
    );
    timelineStartIndex = clamp(
        state.timelineStartIndex ?? 0,
        0,
        Math.max(0, frames.length - VISIBLE_FRAME_COUNT)
    );

    framesUnlocked = !!state.framesUnlocked;
    workspacePanelExpanded = !!state.workspacePanelExpanded;
    colorPanelVisible = state.colorPanelVisible !== false;
    multiLayerModeEnabled = !!state.multiLayerModeEnabled;
    advancedLayerControlsExpanded = !!state.advancedLayerControlsExpanded;
    onionSkinEnabled = state.onionSkinEnabled !== false;
    currentWorkspaceMode = state.currentWorkspaceMode === "tileset" ? "tileset" : "frames";
    playbackMode = state.playbackMode === "pingpong" || state.playbackMode === "once" ? state.playbackMode : "loop";
    rectMode = state.rectMode === "fill" ? "fill" : "outline";
    noiseEnabled = !!state.noiseEnabled;
    noiseStrength = clamp(parseInt(state.noiseStrength, 10) || 28, MIN_NOISE_STRENGTH, MAX_NOISE_STRENGTH);
    noiseDensity = clamp(parseInt(state.noiseDensity, 10) || 72, MIN_NOISE_DENSITY, MAX_NOISE_DENSITY);
    variantIncludeNoise = !!state.variantIncludeNoise;
    setCustomStampBrush(state.customStampBrush);
    lastStandardBrushType = state.lastStandardBrushType || "pixel";
    brushType = state.brushType === CUSTOM_BRUSH_TYPE ? CUSTOM_BRUSH_TYPE : (state.brushType || "pixel");

    if (rectModeSelect) {
        rectModeSelect.value = rectMode;
    }

    syncShapeModeRadios();

    if (state.frameMoveSelectionIndex === null || state.frameMoveSelectionIndex === undefined) {
        syncFrameMoveSelectionToCurrentFrame();
    } else {
        frameMoveSelectionIndex = clamp(state.frameMoveSelectionIndex, 0, frames.length - 1);
    }

    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();
    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameReorderUI();
    updateWorkspaceModeUI();
    updateFrameUI();
    updatePlaybackUI();
    updateHistoryUI();
    updateNoiseUI();
    updateVariantNoiseUI();
    syncFoldoutUI();
    refreshWorkspacePreview();
}

function getCurrentFrame() {
    return frames[currentFrameIndex];
}

function currentLayerCount() {
    if (!frames.length) return 1;
    return frames[0].layers.length;
}

function clampCurrentLayerIndex() {
    currentLayerIndex = clamp(currentLayerIndex, 0, Math.max(0, currentLayerCount() - 1));
}

function getActiveLayer() {
    clampCurrentLayerIndex();
    return getCurrentFrame().layers[currentLayerIndex];
}

function getLayerAtIndex(frame, index) {
    if (!frame) return null;
    if (index < 0 || index >= frame.layers.length) return null;
    return frame.layers[index];
}

function getTopVisibleEditableLayerIndexAt(x, y) {
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return null;

    const frame = getCurrentFrame();

    for (let i = frame.layers.length - 1; i >= 0; i--) {
        const layer = frame.layers[i];
        if (!layer.visible || layer.locked) continue;
        if (layer.grid[y][x] !== null) {
            return i;
        }
    }

    return null;
}

function getSelectablePixelStackAt(x, y) {
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return [];

    const frame = getCurrentFrame();
    const stack = [];

    for (let i = 0; i < frame.layers.length; i++) {
        const layer = frame.layers[i];
        if (!layer.visible || layer.locked) continue;

        const color = layer.grid[y][x];
        if (color === null) continue;

        stack.push({
            color,
            layerIndex: i
        });
    }

    return stack;
}

function getTopSelectionPixelColor(pixel) {
    if (!pixel) return null;
    if (pixel.topColor) return pixel.topColor;
    if (!pixel.layers || !pixel.layers.length) return null;
    return pixel.layers[pixel.layers.length - 1].color;
}

function createPixelGrid() {
    frames = [createFrameDataFromLayerTemplate()];
    currentFrameIndex = 0;
    currentLayerIndex = 0;
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();
}

function getEditableGrid() {
    return getActiveLayer().grid;
}

function setEditableGrid(grid) {
    getActiveLayer().grid = cloneGrid(grid);
    markCurrentFrameRenderCacheDirty();
}

function getBaseCanvasDisplaySize() {
    if (!canvasContainer) {
        return DISPLAY_SIZE;
    }

    const availableWidth = Math.max(128, canvasContainer.clientWidth - CANVAS_CONTAINER_PADDING);
    const availableHeight = Math.max(128, canvasContainer.clientHeight - CANVAS_CONTAINER_PADDING);

    return Math.min(DISPLAY_SIZE, availableWidth, availableHeight);
}

function getScaledCanvasSize() {
    return Math.round(getBaseCanvasDisplaySize() * zoomLevel);
}

function updateCanvasOverflowMode() {
    if (!canvasContainer) return;
    canvasContainer.style.overflow = zoomLevel > 1 ? "auto" : "hidden";
}

function getCanvasViewportSnapshot() {
    if (!canvasContainer) return null;

    const previousSize = canvas.offsetWidth || getScaledCanvasSize();
    const centerX = canvasContainer.scrollLeft + (canvasContainer.clientWidth / 2);
    const centerY = canvasContainer.scrollTop + (canvasContainer.clientHeight / 2);

    return {
        previousSize,
        ratioX: previousSize > 0 ? centerX / previousSize : 0.5,
        ratioY: previousSize > 0 ? centerY / previousSize : 0.5
    };
}

function restoreCanvasViewportSnapshot(snapshot) {
    if (!canvasContainer || !snapshot || zoomLevel <= 1) return;

    const nextSize = canvas.offsetWidth || getScaledCanvasSize();
    const maxScrollLeft = Math.max(0, nextSize - canvasContainer.clientWidth);
    const maxScrollTop = Math.max(0, nextSize - canvasContainer.clientHeight);

    const nextCenterX = snapshot.ratioX * nextSize;
    const nextCenterY = snapshot.ratioY * nextSize;

    canvasContainer.scrollLeft = clamp(
        Math.round(nextCenterX - canvasContainer.clientWidth / 2),
        0,
        maxScrollLeft
    );

    canvasContainer.scrollTop = clamp(
        Math.round(nextCenterY - canvasContainer.clientHeight / 2),
        0,
        maxScrollTop
    );
}

function centerCanvasViewport() {
    if (!canvasContainer) return;

    if (zoomLevel <= 1) {
        canvasContainer.scrollLeft = 0;
        canvasContainer.scrollTop = 0;
        return;
    }

    const scaledSize = canvas.offsetWidth || getScaledCanvasSize();
    const maxScrollLeft = Math.max(0, scaledSize - canvasContainer.clientWidth);
    const maxScrollTop = Math.max(0, scaledSize - canvasContainer.clientHeight);

    canvasContainer.scrollLeft = Math.round(maxScrollLeft / 2);
    canvasContainer.scrollTop = Math.round(maxScrollTop / 2);
}

function applyCanvasZoom() {
    const scaledSize = getScaledCanvasSize();
    const renderDisplaySize = getRenderDisplaySize();

    CELL_SIZE = renderDisplaySize / GRID_SIZE;

    canvas.style.setProperty("width", `${scaledSize}px`, "important");
    canvas.style.setProperty("height", `${scaledSize}px`, "important");
    canvas.style.setProperty("max-width", "none", "important");
    canvas.style.setProperty("max-height", "none", "important");
    canvas.width = renderDisplaySize;
    canvas.height = renderDisplaySize;

    syncPreviewOverlayCanvasSize(scaledSize, renderDisplaySize);
    updateCanvasOverflowMode();
}

function setZoomLevel(nextZoomLevel, options = {}) {
    const clampedZoom = clamp(nextZoomLevel, MIN_ZOOM, MAX_ZOOM);
    const shouldRecenter = !!options.recenter;

    if (clampedZoom === zoomLevel && !shouldRecenter) {
        updateZoomLabel();
        refreshWorkspacePreview();
        return;
    }

    const snapshot = shouldRecenter ? null : getCanvasViewportSnapshot();

    zoomLevel = clampedZoom;
    applyCanvasZoom();
    updateZoomLabel();

    requestAnimationFrame(() => {
        if (shouldRecenter) {
            centerCanvasViewport();
        } else {
            restoreCanvasViewportSnapshot(snapshot);
        }
        refreshWorkspacePreview();
    });
}

function handleCanvasContainerResize() {
    applyCanvasZoom();
    if (zoomLevel <= 1) {
        centerCanvasViewport();
    }
    refreshWorkspacePreview();
}

function updateZoomLabel() {
    if (!zoomLabel) return;
    zoomLabel.textContent = `${Math.round(zoomLevel * 100)}%`;
}

function updateHistoryUI() {
    ensureEditPanelExists();

    if (undoButton) {
        undoButton.disabled = isPlaying || undoStack.length === 0;
    }

    if (redoButton) {
        redoButton.disabled = isPlaying || redoStack.length === 0;
    }

    if (historyStatus) {
        historyStatus.textContent = `Undo ${undoStack.length} / Redo ${redoStack.length}`;
    }
}

function refreshPaletteUI() {
    renderColorFamilies();
    renderSavedPalette();
    renderRecentPalette();
}

function refreshWorkspacePreview() {
    if (drawing || selecting || movingSelection || rectDrawing) {
        queueActiveStrokeRefresh();
        return;
    }

    if (isPlaying) {
        queuePlaybackFrameDraw();
        return;
    }

    queueWorkspacePreviewRefresh();
}

function clearSelection() {
    selecting = false;
    movingSelection = false;
    selectionMoveStateSaved = false;
    selectionDetachedFromCanvas = false;
    selectionStart = null;
    originalSelectionStart = null;
    selectionEnd = null;
    selectionOffset = { x: 0, y: 0 };
    selectionPixels = [];
    selectionWidth = 0;
    selectionHeight = 0;
}

function clearLinePath() {
    lineAnchor = null;
    lineStartPoint = null;
    lineHasCommittedSegment = false;
}

function clearRectState() {
    rectDrawing = false;
    rectStart = null;
    rectEnd = null;
}

function clearFrameDragState() {
    dragFrameIndex = null;
    dragOverFrameIndex = null;
    dragStartedInWindow = false;
    applyFrameDragVisuals();
}

function resetPointerStrokeState() {
    pointerDownOnCanvas = false;
    drawPointerId = null;
    isPointerOutsideCanvas = false;
    pendingCustomBrushWorkerStampQueue = [];
    liveCustomBrushStampFlushQueued = false;
    pendingCustomBrushWorkerLineSegment = null;
    customStampBatchDeferQueued = false;
    customBrushStrokePumpQueued = false;
    pendingCustomBrushStrokePoints = [];
}

function normalizeColor(color) {
    if (!color) return null;
    return color.toLowerCase();
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function clampFps(value) {
    return clamp(Math.round(value), MIN_FPS, MAX_FPS);
}

function getPlaybackFps() {
    const parsed = parseInt(fpsInput.value, 10);
    const fps = Number.isFinite(parsed) ? clampFps(parsed) : 6;
    fpsInput.value = fps;
    return fps;
}

function getPlaybackMode() {
    if (!playbackModeSelect) {
        playbackMode = "loop";
        return playbackMode;
    }

    const value = playbackModeSelect.value;
    playbackMode = value === "pingpong" ? "pingpong" : value === "once" ? "once" : "loop";
    return playbackMode;
}

function getPlaybackModeLabel() {
    const mode = getPlaybackMode();
    if (mode === "pingpong") return "Ping-Pong";
    if (mode === "once") return "Play Once";
    return "Loop";
}

function updatePlaybackStatusText() {
    if (!playbackStatus) return;

    playbackStatus.textContent = isPlaying
        ? `Playing ${getPlaybackFps()} FPS · ${getPlaybackModeLabel()}`
        : `Stopped · ${getPlaybackModeLabel()}`;
}

function updateFrameStatusText() {
    if (!frameStatus) return;
    frameStatus.textContent = `Frame ${currentFrameIndex + 1} / ${frames.length}`;
}

function updatePlaybackFrameUiLightweight() {
    updateFrameStatusText();
    updatePlaybackStatusText();
    updateFrameDurationUI();
}

function updatePlaybackUI() {
    updatePlaybackStatusText();

    if (playAnimationButton) {
        playAnimationButton.classList.toggle("activeTool", isPlaying);
    }

    if (stopAnimationButton) {
        stopAnimationButton.classList.toggle("activeTool", !isPlaying);
    }

    if (fpsInput) {
        fpsInput.disabled = isPlaying;
    }

    if (playbackModeSelect) {
        playbackModeSelect.disabled = isPlaying;
        playbackModeSelect.value = playbackMode;
    }

    if (exportButton) exportButton.disabled = isPlaying;
    if (exportSpritesheetButton) exportSpritesheetButton.disabled = isPlaying;
    if (exportSpritesheetVerticalButton) exportSpritesheetVerticalButton.disabled = isPlaying;
    if (exportSpritesheetWrappedButton) exportSpritesheetWrappedButton.disabled = isPlaying;
    if (importButton) importButton.disabled = isPlaying;
    if (importNewFrameButton) importNewFrameButton.disabled = isPlaying;
    if (importSpritesheetButton) importSpritesheetButton.disabled = isPlaying;
    if (generateVariantButton) generateVariantButton.disabled = isPlaying;
    if (rerollVariantButton) rerollVariantButton.disabled = isPlaying;
    if (variantModeSelect) variantModeSelect.disabled = isPlaying;
    if (advancedLayerToggleButton) advancedLayerToggleButton.disabled = isPlaying;
    if (layerOpacitySlider) layerOpacitySlider.disabled = isPlaying || !multiLayerModeEnabled;
    if (saveProjectButton) saveProjectButton.disabled = isPlaying;
    if (loadProjectButton) loadProjectButton.disabled = isPlaying;
    if (rectModeSelect) rectModeSelect.disabled = isPlaying;
    if (noiseToggleButton) noiseToggleButton.disabled = isPlaying;
    if (variantNoiseToggleButton) variantNoiseToggleButton.disabled = isPlaying;
    if (clearCanvasButton) clearCanvasButton.disabled = isPlaying || !frames.length;

    const outlineRadio = document.getElementById("rectModeOutline");
    const fillRadio = document.getElementById("rectModeFill");
    if (outlineRadio) outlineRadio.disabled = isPlaying;
    if (fillRadio) fillRadio.disabled = isPlaying;

    updateHistoryUI();
    updateFrameMoveUI();
    updateLayerUI();
    updateFrameDurationUI();
    updateVariantUI();
    updateAdvancedLayerUI();
    updateNoiseUI();
    updateVariantNoiseUI();
    syncFoldoutUI();
}

function updateOnionSkinUI() {
    const showOnionSkin = frames.length > 1;
    const onionSkinForcedOffForLargeCanvas = GRID_SIZE >= 512;

    if (onionSkinForcedOffForLargeCanvas) {
        onionSkinEnabled = false;
    }

    if (onionSkinPanel) {
        onionSkinPanel.style.display = showOnionSkin ? "block" : "none";
    }

    if (!onionSkinToggleButton) return;

    if (onionSkinForcedOffForLargeCanvas) {
        onionSkinToggleButton.classList.remove("activeTool");
        onionSkinToggleButton.textContent = "Onion Skin OFF on large canvas";
        onionSkinToggleButton.style.fontSize = "11px";
        onionSkinToggleButton.style.background = "#ff9b9b";
        onionSkinToggleButton.style.borderColor = "#ff6b6b";
        onionSkinToggleButton.style.color = "#2b1111";
        onionSkinToggleButton.style.opacity = "1";
        return;
    }

    onionSkinToggleButton.classList.toggle("activeTool", onionSkinEnabled);
    onionSkinToggleButton.textContent = onionSkinEnabled ? "Onion Skin: ON" : "Onion Skin: OFF";
    onionSkinToggleButton.style.fontSize = "";
    onionSkinToggleButton.style.background = "";
    onionSkinToggleButton.style.borderColor = "";
    onionSkinToggleButton.style.color = "";
    onionSkinToggleButton.style.opacity = "";
}

function updateColorPanelUI() {
    if (frames.length <= 1) {
        colorPanelVisible = true;
    }

    if (colorPanelGroup) {
        colorPanelGroup.style.display = colorPanelVisible ? "block" : "none";
    }

    if (toggleColorPanelButton) {
        toggleColorPanelButton.textContent = colorPanelVisible ? "Hide Color Panel" : "Show Color Panel";
        toggleColorPanelButton.classList.toggle("activeTool", !colorPanelVisible);
    }

    syncFoldoutUI();
}

function updateWorkspaceModeUI() {
    if (showFramesModeButton) {
        showFramesModeButton.classList.toggle("activeTool", currentWorkspaceMode === "frames");
    }

    if (showTilesetModeButton) {
        showTilesetModeButton.classList.toggle("activeTool", currentWorkspaceMode === "tileset");
    }

    if (framesWorkspace) {
        framesWorkspace.style.display = currentWorkspaceMode === "frames" ? "block" : "none";
    }

    if (tilesetWorkspace) {
        tilesetWorkspace.style.display = currentWorkspaceMode === "tileset" ? "block" : "none";
    }

    updateWorkspacePanelUI();
    updateAdvancedLayerUI();
    syncFoldoutUI();
}

function updateFrameReorderUI() {
    if (!frameReorderToggleButton) return;
    frameReorderToggleButton.textContent = framesUnlocked ? "Frames Unlocked" : "Frames Locked";
    frameReorderToggleButton.classList.toggle("activeTool", framesUnlocked);
    frameReorderToggleButton.classList.toggle("framesUnlockedState", framesUnlocked);
    frameReorderToggleButton.classList.toggle("framesLockedState", !framesUnlocked);
}

function updateFrameMoveUI() {
    const hasTrackedFrame =
        frameMoveSelectionIndex !== null &&
        frameMoveSelectionIndex >= 0 &&
        frameMoveSelectionIndex < frames.length;

    const canMoveSelectedFrame =
        framesUnlocked &&
        hasTrackedFrame &&
        !isPlaying;

    const canNavigateFrames = !framesUnlocked && !isPlaying && frames.length > 1;

    if (moveFrameLeftButton) {
        moveFrameLeftButton.disabled = framesUnlocked
            ? (!canMoveSelectedFrame || frameMoveSelectionIndex <= 0)
            : (!canNavigateFrames || currentFrameIndex <= 0);

        moveFrameLeftButton.textContent = framesUnlocked ? "Move Left" : "Prev Frame";
        moveFrameLeftButton.title = framesUnlocked ? "Move Frame Left" : "Previous Frame";
    }

    if (moveFrameRightButton) {
        moveFrameRightButton.disabled = framesUnlocked
            ? (!canMoveSelectedFrame || frameMoveSelectionIndex >= frames.length - 1)
            : (!canNavigateFrames || currentFrameIndex >= frames.length - 1);

        moveFrameRightButton.textContent = framesUnlocked ? "Move Right" : "Next Frame";
        moveFrameRightButton.title = framesUnlocked ? "Move Frame Right" : "Next Frame";
    }
}

function getLayerRowTintClass(layer) {
    return ensureLayerOpacity(layer) < 1 ? "pixelForgeTransparentLayerRow" : "pixelForgeOpaqueLayerRow";
}

function getLayerRowTintStyle(layer, isActive) {
    const opacityPercent = alphaToOpacityPercent(ensureLayerOpacity(layer));

    if (opacityPercent >= 100) {
        return "";
    }

    const fadeStrength = 1 - (opacityPercent / 100);
    const alpha = isActive
        ? (0.18 + fadeStrength * 0.26)
        : (0.08 + fadeStrength * 0.18);

    return `rgba(220, 70, 70, ${alpha.toFixed(3)})`;
}

function duplicateActiveLayer() {
    if (isPlaying || !multiLayerModeEnabled) return;
    if (currentLayerCount() >= MAX_LAYERS) return;

    saveState();

    const insertIndex = currentLayerIndex + 1;

    for (const frame of frames) {
        const sourceLayer = frame.layers[currentLayerIndex];
        const duplicateLayer = cloneLayer(sourceLayer);
        duplicateLayer.name = `${sourceLayer.name} Copy`;
        frame.layers.splice(insertIndex, 0, duplicateLayer);
    }

    currentLayerIndex = insertIndex;
    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    openFoldoutForElement(duplicateLayerMiniButton);
    updateLayerUI();
    renderFrameTimeline();
    refreshWorkspacePreview();
}

function clearActiveLayer() {
    if (isPlaying || !multiLayerModeEnabled || !frames.length) return;

    const activeLayer = getActiveLayer();
    if (!activeLayer || activeLayer.locked) return;

    saveState();

    activeLayer.grid = createBlankGrid();
    markCurrentFrameRenderCacheDirty();
    clearSelection();
    clearLinePath();
    clearRectState();
    openFoldoutForElement(clearLayerButton);
    updateLayerUI();
    renderFrameTimeline();
    refreshWorkspacePreview();
}

function clearCurrentFrameCanvas() {
    if (isPlaying || !frames.length) return;

    saveState();

    const frame = getCurrentFrame();

    for (const layer of frame.layers) {
        layer.grid = createBlankGrid();
    }

    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    openFoldoutForElement(clearCanvasButton);
    updateLayerUI();
    renderFrameTimeline();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function mergeLayerDown() {
    if (isPlaying || !multiLayerModeEnabled || !frames.length) return;
    if (currentLayerIndex <= 0) return;

    const activeLayer = getActiveLayer();
    const belowLayer = getLayerAtIndex(getCurrentFrame(), currentLayerIndex - 1);

    if (!activeLayer || !belowLayer) return;
    if (activeLayer.locked || belowLayer.locked) return;

    saveState();

    for (const frame of frames) {
        const sourceLayer = frame.layers[currentLayerIndex];
        const targetLayer = frame.layers[currentLayerIndex - 1];

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const sourceColor = sourceLayer.grid[y][x];
                if (sourceColor !== null) {
                    targetLayer.grid[y][x] = sourceColor;
                }
            }
        }

        frame.layers.splice(currentLayerIndex, 1);
    }

    currentLayerIndex -= 1;
    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    openFoldoutForElement(mergeLayerButton);
    updateLayerUI();
    renderFrameTimeline();
    refreshWorkspacePreview();
}

function transformActiveLayer(transformFn) {
    if (isPlaying || !frames.length) return;

    const activeLayer = getActiveLayer();
    if (!activeLayer || activeLayer.locked) return;

    saveState();

    activeLayer.grid = transformFn(activeLayer.grid);
    markCurrentFrameRenderCacheDirty();
    clearSelection();
    clearLinePath();
    clearRectState();
    queueTimelineRefresh();
    updateHistoryUI();
    updateFrameUI();
    refreshWorkspacePreview();
}

function flipGridHorizontal(grid) {
    const nextGrid = createBlankGrid();

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            nextGrid[y][GRID_SIZE - 1 - x] = grid[y][x];
        }
    }

    return nextGrid;
}

function flipGridVertical(grid) {
    const nextGrid = createBlankGrid();

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            nextGrid[GRID_SIZE - 1 - y][x] = grid[y][x];
        }
    }

    return nextGrid;
}

function rotateGridRight(grid) {
    const nextGrid = createBlankGrid();

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            nextGrid[x][GRID_SIZE - 1 - y] = grid[y][x];
        }
    }

    return nextGrid;
}

function flipActiveLayerHorizontal() {
    openFoldoutForElement(flipHorizontalButton);
    transformActiveLayer(flipGridHorizontal);
}

function flipActiveLayerVertical() {
    openFoldoutForElement(flipVerticalButton);
    transformActiveLayer(flipGridVertical);
}

function rotateActiveLayerRight() {
    openFoldoutForElement(rotateRightButton);
    transformActiveLayer(rotateGridRight);
}

function updateLayerUI() {
    if (toggleLayerModeButton) {
        toggleLayerModeButton.textContent = multiLayerModeEnabled ? "Multi-Layer Mode: ON" : "Multi-Layer Mode: OFF";
        toggleLayerModeButton.classList.toggle("activeTool", multiLayerModeEnabled);
    }

    if (layerPanel) {
        layerPanel.style.display = multiLayerModeEnabled ? "block" : "none";
    }

    updateAdvancedLayerUI();

    if (!multiLayerModeEnabled) {
        syncFoldoutUI();
        return;
    }

    clampCurrentLayerIndex();

    if (layerStatus) {
        layerStatus.textContent = `Layer ${currentLayerIndex + 1} / ${currentLayerCount()}`;
    }

    if (addLayerButton) {
        addLayerButton.disabled = isPlaying || currentLayerCount() >= MAX_LAYERS;
    }

    if (deleteLayerButton) {
        deleteLayerButton.disabled = isPlaying || currentLayerCount() <= 1;
    }

    renderLayerList();
    syncFoldoutUI();
}

function renderLayerList() {
    if (!layerList || !multiLayerModeEnabled) return;

    layerList.innerHTML = "";

    const frame = getCurrentFrame();

    for (let i = frame.layers.length - 1; i >= 0; i--) {
        const layer = frame.layers[i];
        ensureLayerOpacity(layer);

        const row = document.createElement("div");
        row.className = "layerRow";
        row.classList.add(getLayerRowTintClass(layer));

        const isActiveLayer = i === currentLayerIndex;
        if (isActiveLayer) {
            row.classList.add("activeLayerRow");
        }

        const tintStyle = getLayerRowTintStyle(layer, isActiveLayer);
        if (tintStyle) {
            row.style.background = tintStyle;
        }

        const eyeButton = document.createElement("button");
        eyeButton.type = "button";
        eyeButton.textContent = layer.visible ? "👁" : "—";
        eyeButton.title = layer.visible ? "Hide Layer" : "Show Layer";
        eyeButton.onclick = () => toggleLayerVisibility(i);

        const nameButton = document.createElement("button");
        nameButton.type = "button";
        nameButton.className = "layerNameButton";
        const opacityPercent = alphaToOpacityPercent(layer.opacity);
        nameButton.textContent = opacityPercent < 100 ? `${layer.name} · ${opacityPercent}%` : layer.name;
        nameButton.title = layer.name;
        nameButton.onclick = () => selectLayer(i);

        const lockButton = document.createElement("button");
        lockButton.type = "button";
        lockButton.textContent = layer.locked ? "🔒" : "🔓";
        lockButton.title = layer.locked ? "Unlock Layer" : "Lock Layer";
        lockButton.onclick = () => toggleLayerLock(i);

        const upButton = document.createElement("button");
        upButton.type = "button";
        upButton.textContent = "▲";
        upButton.title = "Move Layer Up";
        upButton.disabled = i >= frame.layers.length - 1 || layer.locked || frame.layers[i + 1].locked || isPlaying;
        upButton.onclick = () => moveLayer(i, 1);

        const downButton = document.createElement("button");
        downButton.type = "button";
        downButton.textContent = "▼";
        downButton.title = "Move Layer Down";
        downButton.disabled = i <= 0 || layer.locked || frame.layers[i - 1].locked || isPlaying;
        downButton.onclick = () => moveLayer(i, -1);

        const activeButton = document.createElement("button");
        activeButton.type = "button";
        activeButton.textContent = isActiveLayer ? "●" : "○";
        activeButton.title = "Set Active Layer";
        activeButton.onclick = () => selectLayer(i);

        row.appendChild(eyeButton);
        row.appendChild(nameButton);
        row.appendChild(lockButton);
        row.appendChild(upButton);
        row.appendChild(downButton);
        row.appendChild(activeButton);

        layerList.appendChild(row);
    }
}

function shouldShowFramePanels() {
    return frames.length > 1;
}

function ensureUpdateFramesControlExists() {
    if (!frameTimelinePanelBlock) return;

    let controlRow = document.getElementById("pixelForgeFrameRefreshRow");
    updateFramesButton = document.getElementById("pixelForgeFrameRefreshButton");

    if (!controlRow) {
        controlRow = document.createElement("div");
        controlRow.id = "pixelForgeFrameRefreshRow";
        controlRow.className = "pixelForgeFrameRefreshRow";
        controlRow.innerHTML = `
            <button id="pixelForgeFrameRefreshButton" class="pixelForgeFrameRefreshButton" type="button">Update Frames</button>
        `;

        frameTimelinePanelBlock.appendChild(controlRow);
        updateFramesButton = document.getElementById("pixelForgeFrameRefreshButton");
    }

    if (updateFramesButton && !updateFramesButton.dataset.boundUpdateFramesButton) {
        updateFramesButton.onclick = () => {
            if (isPlaying) return;
            renderFrameTimeline();
        };
        updateFramesButton.dataset.boundUpdateFramesButton = "true";
    }
}

function updateUpdateFramesButtonUI() {
    ensureUpdateFramesControlExists();

    if (!updateFramesButton) return;

    updateFramesButton.textContent = "Update Frames";
    updateFramesButton.disabled = isPlaying || !shouldShowFramePanels();
}

function updateFramesWorkspaceVisibility() {
    const showPanels = shouldShowFramePanels();

    if (frameTimelinePanelBlock) {
        frameTimelinePanelBlock.style.display = showPanels ? "block" : "none";
    }

    if (frameReorderPanelBlock) {
        frameReorderPanelBlock.style.display = showPanels ? "block" : "none";
    }

    updateUpdateFramesButtonUI();
    syncFoldoutUI();
}

function updateWorkspacePanelUI() {
    const hasMultipleFrames = frames.length > 1;
    const showToggleButton = currentWorkspaceMode === "frames" && hasMultipleFrames;
    const showContent = currentWorkspaceMode === "tileset" ? true : workspacePanelExpanded;

    if (toggleWorkspacePanelButton) {
        toggleWorkspacePanelButton.style.display = showToggleButton ? "block" : "none";
        toggleWorkspacePanelButton.textContent = workspacePanelExpanded ? "Hide Workspace Panel" : "Show Workspace Panel";
    }

    if (animationWorkspaceContent) {
        animationWorkspaceContent.style.display = showContent ? "block" : "none";
    }

    syncFoldoutUI();
}

function updateLeftFrameNavUI() {
    const showLeftNav = currentWorkspaceMode === "frames" && frames.length > 1 && !workspacePanelExpanded;

    if (frameNavRow) {
        frameNavRow.style.display = showLeftNav ? "grid" : "none";
    }

    if (prevFrameButton) {
        prevFrameButton.disabled = !showLeftNav || currentFrameIndex <= 0;
    }

    if (nextFrameButton) {
        nextFrameButton.disabled = !showLeftNav || currentFrameIndex >= frames.length - 1;
    }
}

function stopPlayback(restoreOriginalFrame = true) {
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }

    if (isPlaying && restoreOriginalFrame) {
        currentFrameIndex = playbackFrameBeforePlay;
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        ensureTimelineShowsFrame(currentFrameIndex);
        updateFrameUI();
        updateHistoryUI();
        refreshWorkspacePreview();
    }

    isPlaying = false;
    playbackDirection = 1;
    layerOpacityInteractionSaved = false;
    updatePlaybackUI();
}

function finishPlaybackAtCurrentFrame() {
    if (playbackTimer) {
        clearTimeout(playbackTimer);
        playbackTimer = null;
    }

    isPlaying = false;
    playbackDirection = 1;
    updatePlaybackUI();
}

function getPlaybackDelayMs() {
    const fps = getPlaybackFps();
    const hold = getCurrentFrameDuration();
    return Math.max(1, Math.round((1000 / fps) * hold));
}

function advancePlaybackFrame() {
    if (frames.length <= 1) return false;

    const mode = getPlaybackMode();

    if (mode === "pingpong") {
        if (frames.length === 2) {
            currentFrameIndex = currentFrameIndex === 0 ? 1 : 0;
            syncFrameMoveSelectionToCurrentFrame();
            clearCurrentFrameRenderCache();
            ensureTimelineShowsFrame(currentFrameIndex);
            updatePlaybackFrameUiLightweight();
            queuePlaybackFrameDraw();
            return true;
        }

        let nextIndex = currentFrameIndex + playbackDirection;

        if (nextIndex >= frames.length) {
            playbackDirection = -1;
            nextIndex = currentFrameIndex + playbackDirection;
        } else if (nextIndex < 0) {
            playbackDirection = 1;
            nextIndex = currentFrameIndex + playbackDirection;
        }

        currentFrameIndex = clamp(nextIndex, 0, frames.length - 1);
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        ensureTimelineShowsFrame(currentFrameIndex);
        updatePlaybackFrameUiLightweight();
        queuePlaybackFrameDraw();
        return true;
    }

    if (mode === "once") {
        if (currentFrameIndex >= frames.length - 1) {
            return false;
        }

        currentFrameIndex += 1;
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        ensureTimelineShowsFrame(currentFrameIndex);
        updatePlaybackFrameUiLightweight();
        queuePlaybackFrameDraw();
        return true;
    }

    playbackDirection = 1;
    currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();
    ensureTimelineShowsFrame(currentFrameIndex);
    updatePlaybackFrameUiLightweight();
    queuePlaybackFrameDraw();
    return true;
}

function scheduleNextPlaybackStep() {
    if (!isPlaying) return;

    const delayMs = getPlaybackDelayMs();

    playbackTimer = setTimeout(() => {
        if (!isPlaying) return;

        const advanced = advancePlaybackFrame();

        if (!advanced && getPlaybackMode() === "once") {
            finishPlaybackAtCurrentFrame();
            return;
        }

        scheduleNextPlaybackStep();
    }, delayMs);
}

function startPlayback() {
    if (frames.length <= 1) {
        updatePlaybackUI();
        return;
    }

    stopPlayback(false);

    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();
    drawing = false;
    selecting = false;
    movingSelection = false;
    selectionDetachedFromCanvas = false;
    resetPointerStrokeState();

    playbackMode = getPlaybackMode();
    playbackTimelineFrozenIndex = currentFrameIndex;

    if (playbackMode === "once") {
        playbackFrameBeforePlay = 0;
        currentFrameIndex = 0;
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        ensureTimelineShowsFrame(currentFrameIndex);
    } else {
        playbackFrameBeforePlay = currentFrameIndex;
    }

    if (playbackMode === "pingpong") {
        playbackDirection = currentFrameIndex >= frames.length - 1 ? -1 : 1;
    } else {
        playbackDirection = 1;
    }

    isPlaying = true;
    openFoldoutForElement(playAnimationButton);
    updatePlaybackUI();
    updatePlaybackFrameUiLightweight();
    renderFrameTimeline();
    queuePlaybackFrameDraw();
    scheduleNextPlaybackStep();
}

function getPaletteBridge() {
    if (!window.PixelForgePaletteBridge) {
        window.PixelForgePaletteBridge = {};
    }
    return window.PixelForgePaletteBridge;
}

function getPaletteApi() {
    const bridge = getPaletteBridge();
    return bridge.api || {};
}

function syncPaletteBridge() {
    const bridge = getPaletteBridge();

    bridge.refs = {
        colorPicker,
        shadeBarCanvas,
        shadeBarCtx,
        colorFamiliesContainer,
        savedPaletteContainer,
        recentPaletteContainer
    };

    bridge.constants = {
        SAVED_PALETTE_SIZE,
        RECENT_PALETTE_SIZE,
        PALETTE_STORAGE_KEY,
        PALETTE_SPLIT_COLUMNS,
        COLOR_FAMILIES
    };

    bridge.state = {
        get currentColor() {
            return currentColor;
        },
        set currentColor(value) {
            currentColor = value;
        },
        get currentTool() {
            return currentTool;
        },
        set currentTool(value) {
            currentTool = value;
        },
        get savedPalette() {
            return savedPalette;
        },
        set savedPalette(value) {
            savedPalette = value;
        },
        get recentPalette() {
            return recentPalette;
        },
        set recentPalette(value) {
            recentPalette = value;
        }
    };

    bridge.helpers = {
        clamp,
        normalizeColor,
        updateToolUI,
        drawCanvas
    };

    bridge.api = bridge.api || {};
}

function applyPaletteLayout() {
    const api = getPaletteApi();
    if (api.applyPaletteLayout) {
        return api.applyPaletteLayout();
    }
}

function hexToRgb(hex) {
    const api = getPaletteApi();
    if (api.hexToRgb) {
        return api.hexToRgb(hex);
    }

    return {
        r: parseInt(hex.substring(1, 3), 16),
        g: parseInt(hex.substring(3, 5), 16),
        b: parseInt(hex.substring(5, 7), 16)
    };
}

function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(value => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r, g, b) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));

        switch (max) {
            case red:
                h = 60 * (((green - blue) / delta) % 6);
                break;
            case green:
                h = 60 * (((blue - red) / delta) + 2);
                break;
            default:
                h = 60 * (((red - green) / delta) + 4);
                break;
        }
    }

    if (h < 0) h += 360;

    return {
        h,
        s: s * 100,
        l: l * 100
    };
}

function hslToRgb(h, s, l) {
    const sat = clamp(s, 0, 100) / 100;
    const light = clamp(l, 0, 100) / 100;
    const hue = ((h % 360) + 360) % 360;

    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = light - c / 2;

    let rPrime = 0;
    let gPrime = 0;
    let bPrime = 0;

    if (hue < 60) {
        rPrime = c;
        gPrime = x;
        bPrime = 0;
    } else if (hue < 120) {
        rPrime = x;
        gPrime = c;
        bPrime = 0;
    } else if (hue < 180) {
        rPrime = 0;
        gPrime = c;
        bPrime = x;
    } else if (hue < 240) {
        rPrime = 0;
        gPrime = x;
        bPrime = c;
    } else if (hue < 300) {
        rPrime = x;
        gPrime = 0;
        bPrime = c;
    } else {
        rPrime = c;
        gPrime = 0;
        bPrime = x;
    }

    return {
        r: Math.round((rPrime + m) * 255),
        g: Math.round((gPrime + m) * 255),
        b: Math.round((bPrime + m) * 255)
    };
}

function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function getShadeBarColorAt(mouseX) {
    const api = getPaletteApi();
    if (api.getShadeBarColorAt) {
        return api.getShadeBarColorAt(mouseX);
    }
    return currentColor;
}

function loadSavedPalette() {
    const api = getPaletteApi();
    if (api.loadSavedPalette) {
        return api.loadSavedPalette();
    }
}

function persistSavedPalette() {
    const api = getPaletteApi();
    if (api.persistSavedPalette) {
        return api.persistSavedPalette();
    }
}

function addColorToRecentPalette(color) {
    const api = getPaletteApi();
    if (api.addColorToRecentPalette) {
        return api.addColorToRecentPalette(color);
    }
}

function setCurrentColor(color, options = {}) {
    const api = getPaletteApi();
    if (api.setCurrentColor) {
        return api.setCurrentColor(color, options);
    }

    const normalized = normalizeColor(color);
    if (!normalized) return;

    if (currentColor !== normalized) {
        if (pendingCustomStampQueue.length) {
            pendingCustomStampQueue = [];
            pendingCustomStampKeySet.clear();
            customStampFlushQueued = false;
            clearActiveStrokeDirtyRect();
        }

        pendingCustomBrushWorkerStampQueue = [];
        liveCustomBrushStampFlushQueued = false;
        pendingCustomBrushWorkerLineSegment = null;
        customStampBatchDeferQueued = false;
        customBrushStrokePumpQueued = false;
        pendingCustomBrushStrokePoints = [];
        customStampWorkerPendingRedraw = false;
    }

    currentColor = normalized;
    if (colorPicker) {
        colorPicker.value = normalized;
    }

    if (!drawing && !isPlaying) {
        queuePreviewOverlayRefresh();
    }
}

function handleUIColorPick(color) {
    const api = getPaletteApi();
    if (api.handleUIColorPick) {
        return api.handleUIColorPick(color);
    }

    setCurrentColor(color);

    if (currentTool === "eyedropper") {
        currentTool = "pencil";
        updateToolUI();
    }
}

function renderColorFamilies() {
    const api = getPaletteApi();
    if (api.renderColorFamilies) {
        return api.renderColorFamilies();
    }
}

function renderSavedPalette() {
    const api = getPaletteApi();
    if (api.renderSavedPalette) {
        return api.renderSavedPalette();
    }
}

function renderRecentPalette() {
    const api = getPaletteApi();
    if (api.renderRecentPalette) {
        return api.renderRecentPalette();
    }
}

function addCurrentColorToPalette() {
    const api = getPaletteApi();
    if (api.addCurrentColorToPalette) {
        return api.addCurrentColorToPalette();
    }
}

function clearSavedPalette() {
    const api = getPaletteApi();
    if (api.clearSavedPalette) {
        return api.clearSavedPalette();
    }
}

function getVariantMode() {
    if (!variantModeSelect) return "safe";
    return variantModeSelect.value === "wild" ? "wild" : "safe";
}

function updateVariantStatus(message = null) {
    if (!variantStatus) return;

    if (message) {
        variantStatus.textContent = message;
        return;
    }

    variantStatus.textContent = `Current frame only · ${getVariantMode() === "wild" ? "Wild" : "Safe"} · Noise ${variantIncludeNoise ? "ON" : "OFF"}`;
}

function updateVariantUI() {
    if (variantModeSelect) {
        variantModeSelect.value = getVariantMode();
    }
    updateVariantStatus();
}

function quantizeVariantSourceColor(color) {
    const normalized = normalizeColor(color);
    if (!normalized || variantIncludeNoise) {
        return normalized;
    }

    const rgb = hexToRgb(normalized);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const hueBucket = Math.round(hsl.h / 16) * 16;
    const satBucket = Math.round(hsl.s / 12) * 12;
    const lightBucket = Math.round(hsl.l / 10) * 10;

    return hslToHex(hueBucket, satBucket, lightBucket);
}

function collectUniqueFrameColors(frame) {
    const map = new Map();

    for (const layer of frame.layers) {
        if (!layer.visible || layer.locked) continue;

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const color = layer.grid[y][x];
                if (!color) continue;

                const normalized = normalizeColor(color);
                const variantKey = quantizeVariantSourceColor(normalized);

                if (!map.has(variantKey)) {
                    const rgb = hexToRgb(variantKey);
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

                    map.set(variantKey, {
                        key: variantKey,
                        hsl,
                        sourceColors: new Set([normalized])
                    });
                } else {
                    map.get(variantKey).sourceColors.add(normalized);
                }
            }
        }
    }

    return [...map.values()];
}

function buildSafeVariantMap(uniqueColors) {
    const sorted = [...uniqueColors].sort((a, b) => {
        if (a.hsl.l !== b.hsl.l) return a.hsl.l - b.hsl.l;
        if (a.hsl.s !== b.hsl.s) return a.hsl.s - b.hsl.s;
        return a.hsl.h - b.hsl.h;
    });

    const baseHue = randomBetween(0, 360);
    const hueStep = sorted.length > 1 ? randomBetween(8, 24) : 0;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const remap = new Map();

    for (let i = 0; i < sorted.length; i++) {
        const source = sorted[i];
        const sourceLightness = source.hsl.l;
        const sourceSaturation = source.hsl.s;

        const targetHue = baseHue + (i * hueStep * direction) + randomBetween(-10, 10);
        const targetSaturation = clamp(
            Math.max(42, sourceSaturation * randomBetween(0.85, 1.2)) + randomBetween(-6, 6),
            35,
            95
        );
        const targetLightness = clamp(sourceLightness + randomBetween(-4, 4), 8, 92);
        const targetColor = hslToHex(targetHue, targetSaturation, targetLightness);

        for (const sourceColor of source.sourceColors) {
            remap.set(sourceColor, targetColor);
        }
    }

    return remap;
}

function buildWildVariantMap(uniqueColors) {
    const remap = new Map();

    for (const source of uniqueColors) {
        const targetHue = randomBetween(0, 360);
        const targetSaturation = randomBetween(45, 100);
        const targetLightness = randomBetween(18, 82);
        const targetColor = hslToHex(targetHue, targetSaturation, targetLightness);

        for (const sourceColor of source.sourceColors) {
            remap.set(sourceColor, targetColor);
        }
    }

    return remap;
}

function applyVariantMapToCurrentFrame(remap) {
    const frame = getCurrentFrame();

    for (const layer of frame.layers) {
        if (!layer.visible || layer.locked) continue;

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const color = layer.grid[y][x];
                if (!color) continue;

                const nextColor = remap.get(normalizeColor(color));
                if (nextColor) {
                    layer.grid[y][x] = nextColor;
                }
            }
        }
    }
}

function generateVariant(modeOverride = null) {
    if (isPlaying || !frames.length) return;

    const mode = modeOverride || getVariantMode();
    const uniqueColors = collectUniqueFrameColors(getCurrentFrame());

    if (!uniqueColors.length) {
        updateVariantStatus("No visible unlocked colors on current frame");
        return;
    }

    saveState();

    const remap = mode === "wild"
        ? buildWildVariantMap(uniqueColors)
        : buildSafeVariantMap(uniqueColors);

    applyVariantMapToCurrentFrame(remap);
    markCurrentFrameRenderCacheDirty();
    queueTimelineRefresh();
    updateHistoryUI();
    updateFrameUI();
    refreshWorkspacePreview();

    lastVariantMode = mode;
    openFoldoutForElement(generateVariantButton || rerollVariantButton || variantModeSelect);
    updateVariantStatus(
        `Variant applied · ${mode === "wild" ? "Wild" : "Safe"} · ${uniqueColors.length} groups · Noise ${variantIncludeNoise ? "ON" : "OFF"}`
    );
}

function rerollVariant() {
    generateVariant(getVariantMode() || lastVariantMode || "safe");
}

function drawPixelGridToContext(targetCtx, grid, options = {}) {
    if (!targetCtx || !grid) return;

    const alpha = clamp(
        Number.isFinite(options.alpha) ? options.alpha : 1,
        0,
        1
    );
    const pixelSize = Math.max(1, options.pixelSize || 1);
    const offsetX = options.offsetX || 0;
    const offsetY = options.offsetY || 0;

    if (alpha <= 0) return;

    targetCtx.save();
    targetCtx.globalAlpha = alpha;
    targetCtx.imageSmoothingEnabled = false;

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const color = grid[y][x];
            if (!color) continue;

            targetCtx.fillStyle = color;
            targetCtx.fillRect(
                offsetX + (x * pixelSize),
                offsetY + (y * pixelSize),
                pixelSize,
                pixelSize
            );
        }
    }

    targetCtx.restore();
}

function buildFramePixelCanvas(frame, options = {}) {
    const pixelCanvas = document.createElement("canvas");
    const pixelCtx = pixelCanvas.getContext("2d");

    pixelCanvas.width = GRID_SIZE;
    pixelCanvas.height = GRID_SIZE;

    pixelCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
    pixelCtx.imageSmoothingEnabled = false;

    const maxLayerIndex = Math.max(0, frame.layers.length - 1);

    const startLayerIndex = clamp(
        Number.isFinite(options.startLayerIndex) ? options.startLayerIndex : 0,
        0,
        maxLayerIndex
    );

    const endLayerIndex = clamp(
        Number.isFinite(options.endLayerIndex) ? options.endLayerIndex : maxLayerIndex,
        0,
        maxLayerIndex
    );

    if (!frame.layers.length || startLayerIndex > endLayerIndex) {
        return pixelCanvas;
    }

    for (let i = startLayerIndex; i <= endLayerIndex; i++) {
        const layer = frame.layers[i];
        if (!layer.visible) continue;

        const layerAlpha = ensureLayerOpacity(layer);
        if (layerAlpha <= 0) continue;

        drawPixelGridToContext(pixelCtx, layer.grid, {
            alpha: layerAlpha,
            pixelSize: 1
        });
    }

    return pixelCanvas;
}

function getCompositeGrid(frame) {
    const composite = createBlankGrid();

    for (let layerIndex = 0; layerIndex < frame.layers.length; layerIndex++) {
        const layer = frame.layers[layerIndex];
        if (!layer.visible) continue;

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const color = layer.grid[y][x];
                if (color !== null) {
                    composite[y][x] = color;
                }
            }
        }
    }

    return composite;
}

function getCachedCurrentFrameDisplayCanvas() {
    if (
        currentFrameRenderCacheCanvas &&
        currentFrameRenderCacheFrameIndex === currentFrameIndex &&
        !currentFrameRenderCacheDirty
    ) {
        return currentFrameRenderCacheCanvas;
    }

    const renderDisplaySize = getRenderDisplaySize();
    const cacheCanvas = document.createElement("canvas");
    const cacheCtx = cacheCanvas.getContext("2d");

    cacheCanvas.width = renderDisplaySize;
    cacheCanvas.height = renderDisplaySize;
    cacheCtx.clearRect(0, 0, renderDisplaySize, renderDisplaySize);
    cacheCtx.imageSmoothingEnabled = false;

    const framePixelCanvas = buildFramePixelCanvas(getCurrentFrame());

    cacheCtx.drawImage(
        framePixelCanvas,
        0,
        0,
        framePixelCanvas.width,
        framePixelCanvas.height,
        0,
        0,
        renderDisplaySize,
        renderDisplaySize
    );

    currentFrameRenderCacheCanvas = cacheCanvas;
    currentFrameRenderCacheCtx = cacheCtx;
    currentFrameRenderCacheFrameIndex = currentFrameIndex;
    currentFrameRenderCacheDirty = false;

    return currentFrameRenderCacheCanvas;
}

function getCachedCurrentFrameLayerRangeDisplayCanvases(splitLayerIndex = currentLayerIndex) {
    const frame = getCurrentFrame();
    const safeSplitIndex = clamp(
        splitLayerIndex,
        0,
        Math.max(0, frame.layers.length - 1)
    );

    if (
        currentFrameLayerRangeCache.lowerCanvas &&
        currentFrameLayerRangeCache.upperCanvas &&
        currentFrameLayerRangeCache.frameIndex === currentFrameIndex &&
        currentFrameLayerRangeCache.splitLayerIndex === safeSplitIndex &&
        !currentFrameLayerRangeCache.dirty
    ) {
        return {
            lowerCanvas: currentFrameLayerRangeCache.lowerCanvas,
            upperCanvas: currentFrameLayerRangeCache.upperCanvas
        };
    }

    const renderDisplaySize = getRenderDisplaySize();

    const lowerCanvas = document.createElement("canvas");
    const lowerCtx = lowerCanvas.getContext("2d");
    lowerCanvas.width = renderDisplaySize;
    lowerCanvas.height = renderDisplaySize;
    lowerCtx.clearRect(0, 0, renderDisplaySize, renderDisplaySize);
    lowerCtx.imageSmoothingEnabled = false;

    if (safeSplitIndex > 0) {
        const lowerPixelCanvas = buildFramePixelCanvas(frame, {
            startLayerIndex: 0,
            endLayerIndex: safeSplitIndex - 1
        });

        lowerCtx.drawImage(
            lowerPixelCanvas,
            0,
            0,
            lowerPixelCanvas.width,
            lowerPixelCanvas.height,
            0,
            0,
            renderDisplaySize,
            renderDisplaySize
        );
    }

    const upperCanvas = document.createElement("canvas");
    const upperCtx = upperCanvas.getContext("2d");
    upperCanvas.width = renderDisplaySize;
    upperCanvas.height = renderDisplaySize;
    upperCtx.clearRect(0, 0, renderDisplaySize, renderDisplaySize);
    upperCtx.imageSmoothingEnabled = false;

    const upperPixelCanvas = buildFramePixelCanvas(frame, {
        startLayerIndex: safeSplitIndex,
        endLayerIndex: frame.layers.length - 1
    });

    upperCtx.drawImage(
        upperPixelCanvas,
        0,
        0,
        upperPixelCanvas.width,
        upperPixelCanvas.height,
        0,
        0,
        renderDisplaySize,
        renderDisplaySize
    );

    currentFrameLayerRangeCache.lowerCanvas = lowerCanvas;
    currentFrameLayerRangeCache.upperCanvas = upperCanvas;
    currentFrameLayerRangeCache.frameIndex = currentFrameIndex;
    currentFrameLayerRangeCache.splitLayerIndex = safeSplitIndex;
    currentFrameLayerRangeCache.dirty = false;

    return {
        lowerCanvas,
        upperCanvas
    };
}

function getMaxTimelineStart() {
    return Math.max(0, frames.length - VISIBLE_FRAME_COUNT);
}

function clampTimelineStart() {
    timelineStartIndex = clamp(timelineStartIndex, 0, getMaxTimelineStart());
}

function getVisibleFrameRange() {
    clampTimelineStart();

    const total = frames.length;
    const start = timelineStartIndex;
    const end = Math.min(total - 1, start + VISIBLE_FRAME_COUNT - 1);

    return { start, end };
}

function getPrimaryVisibleFrameIndex(startIndex = timelineStartIndex) {
    if (frames.length === 0) return 0;
    const { end } = getVisibleFrameRangeFromStart(startIndex);
    const preferred = startIndex + TIMELINE_PRIMARY_VIEW_OFFSET;
    return clamp(preferred, 0, end);
}

function getVisibleFrameRangeFromStart(startIndex) {
    const start = clamp(startIndex, 0, getMaxTimelineStart());
    const end = Math.min(frames.length - 1, start + VISIBLE_FRAME_COUNT - 1);
    return { start, end };
}

function ensureTimelineShowsFrame(index) {
    clampTimelineStart();

    if (index < timelineStartIndex) {
        timelineStartIndex = index;
    }

    if (index >= timelineStartIndex + VISIBLE_FRAME_COUNT) {
        timelineStartIndex = index - VISIBLE_FRAME_COUNT + 1;
    }

    clampTimelineStart();
}

function updateTimelineBrowseUI() {
    const showBrowse = currentWorkspaceMode === "frames" && frames.length > 1 && workspacePanelExpanded;

    if (timelineHeaderRow) {
        timelineHeaderRow.style.display = showBrowse ? "flex" : "none";
    }

    if (timelinePrevButton) {
        timelinePrevButton.disabled = !showBrowse || timelineStartIndex <= 0;
    }

    if (timelineNextButton) {
        timelineNextButton.disabled = !showBrowse || timelineStartIndex >= getMaxTimelineStart();
    }
}

function setCurrentFrameFromTimelineWindow() {
    const targetIndex = getPrimaryVisibleFrameIndex();
    if (targetIndex < 0 || targetIndex >= frames.length) return;

    loadFrame(targetIndex);
}

function shiftTimelineWindow(direction) {
    if (frames.length <= 1) {
        timelineStartIndex = 0;
        updateFrameUI();
        return;
    }

    timelineStartIndex += direction;
    clampTimelineStart();
    setCurrentFrameFromTimelineWindow();
}

function reorderFrames(fromIndex, toIndex, shouldSaveState = true) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= frames.length || toIndex >= frames.length) return;

    if (shouldSaveState) {
        saveState();
    }

    const movedFrame = frames.splice(fromIndex, 1)[0];
    frames.splice(toIndex, 0, movedFrame);

    if (currentFrameIndex === fromIndex) {
        currentFrameIndex = toIndex;
    } else if (fromIndex < currentFrameIndex && toIndex >= currentFrameIndex) {
        currentFrameIndex -= 1;
    } else if (fromIndex > currentFrameIndex && toIndex <= currentFrameIndex) {
        currentFrameIndex += 1;
    }

    if (frameMoveSelectionIndex === fromIndex) {
        frameMoveSelectionIndex = toIndex;
    } else if (frameMoveSelectionIndex !== null && fromIndex < frameMoveSelectionIndex && toIndex >= frameMoveSelectionIndex) {
        frameMoveSelectionIndex -= 1;
    } else if (frameMoveSelectionIndex !== null && fromIndex > frameMoveSelectionIndex && toIndex <= frameMoveSelectionIndex) {
        frameMoveSelectionIndex += 1;
    }

    clearCurrentFrameRenderCache();

    if (!framesUnlocked) {
        syncFrameMoveSelectionToCurrentFrame();
    }

    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function moveSelectedFrame(direction) {
    if (!framesUnlocked) return;
    if (frameMoveSelectionIndex === null) return;
    if (isPlaying) return;

    const targetIndex = frameMoveSelectionIndex + direction;
    if (targetIndex < 0 || targetIndex >= frames.length) return;

    reorderFrames(frameMoveSelectionIndex, targetIndex, true);
    updateFrameMoveUI();
}

function handleFrameArrowControl(direction) {
    if (isPlaying) return;

    if (framesUnlocked) {
        if (frameMoveSelectionIndex === null) {
            syncFrameMoveSelectionToCurrentFrame();
        }
        moveSelectedFrame(direction);
        return;
    }

    const targetIndex = currentFrameIndex + direction;
    if (targetIndex < 0 || targetIndex >= frames.length) return;

    loadFrame(targetIndex);
}

function applyFrameDragVisuals() {
    if (!frameTimeline) return;

    const items = frameTimeline.querySelectorAll(".frameThumb");

    items.forEach((item) => {
        const index = parseInt(item.dataset.frameIndex, 10);

        item.classList.remove("dragSourceFrameThumb", "dragTargetFrameThumb");

        if (Number.isNaN(index)) return;

        if (dragFrameIndex === index) {
            item.classList.add("dragSourceFrameThumb");
        }

        if (dragOverFrameIndex === index && dragFrameIndex !== index) {
            item.classList.add("dragTargetFrameThumb");
        }
    });
}

function renderFrameThumbnail(frame, thumbCanvas) {
    if (!thumbCanvas || !frame) return;

    const thumbCtx = thumbCanvas.getContext("2d");
    const size = TIMELINE_THUMB_SIZE;
    const padding = 2;

    thumbCanvas.width = size;
    thumbCanvas.height = size;

    thumbCtx.clearRect(0, 0, size, size);
    thumbCtx.fillStyle = "#111";
    thumbCtx.fillRect(0, 0, size, size);
    thumbCtx.imageSmoothingEnabled = false;

    const sourceCanvas = buildFramePixelCanvas(frame);
    const availableWidth = Math.max(1, size - padding * 2);
    const availableHeight = Math.max(1, size - padding * 2);

    const scale = Math.min(
        availableWidth / sourceCanvas.width,
        availableHeight / sourceCanvas.height
    );

    const drawWidth = Math.max(1, Math.floor(sourceCanvas.width * scale));
    const drawHeight = Math.max(1, Math.floor(sourceCanvas.height * scale));
    const drawX = Math.floor((size - drawWidth) / 2);
    const drawY = Math.floor((size - drawHeight) / 2);

    thumbCtx.drawImage(
        sourceCanvas,
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    );
}

function renderFrameTimeline() {
    if (!frameTimeline) return;

    frameTimeline.innerHTML = "";

    const { start, end } = getVisibleFrameRange();
    const highlightedFrameIndex = isPlaying ? playbackTimelineFrozenIndex : currentFrameIndex;

    for (let i = start; i <= end; i++) {
        ensureFrameDuration(frames[i]);

        const item = document.createElement("button");
        item.type = "button";
        item.className = "frameThumb";
        item.dataset.frameIndex = String(i);

        if (i === highlightedFrameIndex) {
            item.classList.add("activeFrameThumb");
        }

        if (!isPlaying && framesUnlocked && frameMoveSelectionIndex === i) {
            item.classList.add("selectedMoveFrameThumb");
        }

        if (framesUnlocked && !isPlaying) {
            item.draggable = true;
            item.title = `Select or drag Frame ${i + 1}`;
        } else {
            item.draggable = false;
            item.title = `Frame ${i + 1}`;
        }

        const thumbCanvas = document.createElement("canvas");
        thumbCanvas.className = "frameThumbCanvas";

        const metaRow = document.createElement("div");
        metaRow.className = "frameThumbMetaRow";

        const numberBadge = document.createElement("span");
        numberBadge.className = "frameNumberBadge";
        numberBadge.textContent = String(i + 1);

        const holdBadge = document.createElement("span");
        holdBadge.className = "frameHoldBadge";
        holdBadge.textContent = `x${frames[i].duration}`;
        if (frames[i].duration <= 1) {
            holdBadge.classList.add("frameHoldBadgeSubtle");
        }

        metaRow.appendChild(numberBadge);
        metaRow.appendChild(holdBadge);

        renderFrameThumbnail(frames[i], thumbCanvas);

        item.appendChild(thumbCanvas);
        item.appendChild(metaRow);

        if (!isPlaying && framesUnlocked && frameMoveSelectionIndex === i) {
            const stateRow = document.createElement("div");
            stateRow.className = "frameThumbStateRow";

            const moveTag = document.createElement("span");
            moveTag.className = "frameStateTag frameStateTagMove";
            moveTag.textContent = "MOVE";
            stateRow.appendChild(moveTag);

            item.appendChild(stateRow);
        }

        item.onclick = () => {
            if (isPlaying) return;
            if (dragStartedInWindow) return;

            loadFrame(i);

            if (framesUnlocked) {
                frameMoveSelectionIndex = i;
                updateFrameUI();
            }
        };

        frameTimeline.appendChild(item);
    }

    applyFrameDragVisuals();
    updateTimelineBrowseUI();
    updateFrameMoveUI();
}

function updateFrameUI() {
    if (frames.length <= 1) {
        colorPanelVisible = true;
    }

    updateFrameStatusText();
    updateFramesWorkspaceVisibility();
    updateWorkspacePanelUI();
    updateLeftFrameNavUI();
    updateOnionSkinUI();
    updateColorPanelUI();
    updateEditPanelVisibility();
    updateAdvancedLayerUI();
    updateUpdateFramesButtonUI();
    queueTimelineRefresh();
    updateHistoryUI();
    updateFrameMoveUI();
    updateLayerUI();
    updateFrameDurationUI();
    updateVariantUI();
    updateNoiseUI();
    updateVariantNoiseUI();
    syncFoldoutUI();
}

function loadFrame(index) {
    if (index < 0 || index >= frames.length || isPlaying) return;

    currentFrameIndex = index;
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();

    clampCurrentLayerIndex();
    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();
    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function addFrame() {
    if (isPlaying) return;

    saveState();

    const newFrame = createFrameDataFromLayerTemplate(getCurrentFrame().layers);
    frames.splice(currentFrameIndex + 1, 0, newFrame);
    currentFrameIndex += 1;
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();
    workspacePanelExpanded = true;
    openFoldoutForElement(addFrameButton);
    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function duplicateFrame() {
    if (isPlaying) return;

    saveState();

    const copy = cloneFrameData(getCurrentFrame());
    frames.splice(currentFrameIndex + 1, 0, copy);
    currentFrameIndex += 1;
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();
    workspacePanelExpanded = true;
    openFoldoutForElement(duplicateFrameButton);
    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function deleteFrame() {
    if (isPlaying) return;

    saveState();

    if (frames.length === 1) {
        frames[0] = createFrameDataFromLayerTemplate(getCurrentFrame().layers);
        currentFrameIndex = 0;
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        timelineStartIndex = 0;
        workspacePanelExpanded = false;
        colorPanelVisible = true;
        updateFrameUI();
        updateHistoryUI();
        refreshWorkspacePreview();
        return;
    }

    frames.splice(currentFrameIndex, 1);

    if (currentFrameIndex >= frames.length) {
        currentFrameIndex = frames.length - 1;
    }

    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    clearFrameDragState();

    if (frames.length <= 1) {
        timelineStartIndex = 0;
        framesUnlocked = false;
        workspacePanelExpanded = false;
        colorPanelVisible = true;
    }

    syncFrameMoveSelectionToCurrentFrame();
    ensureTimelineShowsFrame(currentFrameIndex);
    updateFrameReorderUI();
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function addLayer() {
    if (isPlaying) return;
    if (currentLayerCount() >= MAX_LAYERS) return;

    saveState();

    const newLayerName = `Layer ${currentLayerCount() + 1}`;

    for (const frame of frames) {
        frame.layers.push({
            name: newLayerName,
            visible: true,
            locked: false,
            opacity: 1,
            grid: createBlankGrid()
        });
    }

    currentLayerIndex = currentLayerCount() - 1;
    clearCurrentFrameRenderCache();
    clearSelection();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    updateLayerUI();
    queueTimelineRefresh();
    refreshWorkspacePreview();
}

function deleteLayer() {
    if (isPlaying) return;
    if (currentLayerCount() <= 1) return;

    saveState();

    for (const frame of frames) {
        frame.layers.splice(currentLayerIndex, 1);
    }

    currentLayerIndex = clamp(currentLayerIndex - 1, 0, currentLayerCount() - 1);
    clearCurrentFrameRenderCache();
    clearSelection();
    clearLinePath();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    updateLayerUI();
    queueTimelineRefresh();
    refreshWorkspacePreview();
}

function selectLayer(index) {
    if (index < 0 || index >= currentLayerCount()) return;
    currentLayerIndex = index;
    clearSelection();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    refreshWorkspacePreview();
    updateLayerUI();
}

function toggleLayerVisibility(index) {
    if (isPlaying) return;

    saveState();

    for (const frame of frames) {
        frame.layers[index].visible = !frame.layers[index].visible;
    }

    markCurrentFrameRenderCacheDirty();
    clearSelection();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    queueTimelineRefresh();
    updateLayerUI();
    refreshWorkspacePreview();
}

function toggleLayerLock(index) {
    if (isPlaying) return;

    saveState();

    for (const frame of frames) {
        frame.layers[index].locked = !frame.layers[index].locked;
    }

    clearSelection();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    updateLayerUI();
    refreshWorkspacePreview();
}

function moveLayer(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= currentLayerCount()) return;

    const sourceLayer = getCurrentFrame().layers[index];
    const targetLayer = getCurrentFrame().layers[targetIndex];
    if (sourceLayer.locked || targetLayer.locked) return;

    saveState();

    for (const frame of frames) {
        const moved = frame.layers.splice(index, 1)[0];
        frame.layers.splice(targetIndex, 0, moved);
    }

    if (currentLayerIndex === index) {
        currentLayerIndex = targetIndex;
    } else if (currentLayerIndex === targetIndex) {
        currentLayerIndex = index;
    }

    markCurrentFrameRenderCacheDirty();
    clearSelection();
    clearRectState();
    openFoldoutForElement(toggleLayerModeButton);
    updateLayerUI();
    queueTimelineRefresh();
    refreshWorkspacePreview();
}

function updateZoom() {
    setZoomLevel(zoomLevel);
}

function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (e.clientX - rect.left) * scaleX;
    const canvasY = (e.clientY - rect.top) * scaleY;

    return {
        x: Math.floor(canvasX / CELL_SIZE),
        y: Math.floor(canvasY / CELL_SIZE)
    };
}

function getMousePositionFromClient(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    return {
        x: Math.floor(canvasX / CELL_SIZE),
        y: Math.floor(canvasY / CELL_SIZE)
    };
}

function clampPixelPosition(pos) {
    return {
        x: clamp(pos.x, 0, GRID_SIZE - 1),
        y: clamp(pos.y, 0, GRID_SIZE - 1)
    };
}

function samePixel(a, b) {
    return !!a && !!b && a.x === b.x && a.y === b.y;
}

function saveState() {
    undoStack.push(createHistoryState());

    if (undoStack.length > MAX_HISTORY_STATES) {
        undoStack.shift();
    }

    redoStack = [];
    updateHistoryUI();
}

function getStrokeHistoryCoalesceWindowMs() {
    if (GRID_SIZE >= 512) return 260;
    if (GRID_SIZE >= 256) return 180;
    return 120;
}

function beginStrokeHistoryCapture() {
    const now = performance.now();
    const coalesceWindow = getStrokeHistoryCoalesceWindowMs();
    const historyColor = currentTool === "eraser" ? "__eraser__" : currentColor;

    const canReuseRecentStrokeState =
        undoStack.length > 0 &&
        now - lastStrokeHistorySaveAt <= coalesceWindow &&
        lastStrokeHistoryTool === currentTool &&
        lastStrokeHistoryBrush === brushType &&
        lastStrokeHistoryColor === historyColor;

    if (!canReuseRecentStrokeState) {
        saveState();
    }

    lastStrokeHistorySaveAt = now;
    lastStrokeHistoryTool = currentTool;
    lastStrokeHistoryBrush = brushType;
    lastStrokeHistoryColor = historyColor;
}

function getNoiseStrengthCurve() {
    const ratio = clamp(noiseStrength / 100, 0, 1);

    return {
        densityInfluence: Math.pow(ratio, 1.35),
        lightnessRange: Math.max(1, Math.round(4 + ratio * 10)),
        hueRange: Math.round(1 + ratio * 4)
    };
}

function shadeColorForNoise(hex, shadeOffset, hueShift) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const nextHue = ((hsl.h + hueShift) % 360 + 360) % 360;
    const nextSaturation = clamp(hsl.s + (shadeOffset * 4), 8, 100);
    const nextLightness = clamp(hsl.l + shadeOffset, 3, 97);

    return hslToHex(nextHue, nextSaturation, nextLightness);
}

function buildNoiseShadePalette(baseColor) {
    return {
        lightest: shadeColorForNoise(baseColor, 12, 0),
        light: shadeColorForNoise(baseColor, 6, 0),
        base: normalizeColor(baseColor),
        dark2: shadeColorForNoise(baseColor, -7, 0),
        dark1: shadeColorForNoise(baseColor, -14, 0)
    };
}

function getNoisyColor(baseColor) {
    if (!noiseEnabled || currentTool !== "pencil") {
        return baseColor;
    }

    const curve = getNoiseStrengthCurve();
    const effectiveDensity = noiseDensity * (0.35 + curve.densityInfluence * 0.65);

    if ((Math.random() * 100) > effectiveDensity) {
        return baseColor;
    }

    const palette = buildNoiseShadePalette(baseColor);
    const ratio = clamp(noiseStrength / 100, 0, 1);
    const hueShift = randomBetween(-curve.hueRange, curve.hueRange);

    if (noiseStrength >= 100) {
        return Math.random() < 0.5
            ? shadeColorForNoise(palette.dark1, 0, hueShift)
            : shadeColorForNoise(palette.dark2, 0, hueShift);
    }

    if (noiseStrength >= 95) {
        const roll = Math.random();
        if (roll < 0.22) return shadeColorForNoise(palette.dark2, 0, hueShift);
        if (roll < 0.58) return shadeColorForNoise(palette.base, 0, hueShift);
        if (roll < 0.82) return shadeColorForNoise(palette.light, 0, hueShift);
        return shadeColorForNoise(palette.lightest, 0, hueShift);
    }

    const roll = Math.random();

    if (ratio < 0.35) {
        return roll < 0.7
            ? shadeColorForNoise(palette.base, 0, hueShift)
            : shadeColorForNoise(palette.light, 0, hueShift);
    }

    if (ratio < 0.7) {
        if (roll < 0.4) return shadeColorForNoise(palette.base, 0, hueShift);
        if (roll < 0.8) return shadeColorForNoise(palette.light, 0, hueShift);
        return shadeColorForNoise(palette.lightest, 0, hueShift);
    }

    if (roll < 0.34) return shadeColorForNoise(palette.base, 0, hueShift);
    if (roll < 0.68) return shadeColorForNoise(palette.light, 0, hueShift);
    return shadeColorForNoise(palette.lightest, 0, hueShift);
}

function applyPaintNoDirty(x, y, color) {
    const activeLayer = getActiveLayer();

    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return false;

    if (color === null) {
        if (!activeLayer.locked && activeLayer.grid[y][x] !== null) {
            activeLayer.grid[y][x] = null;
            return true;
        }

        const topLayerIndex = getTopVisibleEditableLayerIndexAt(x, y);
        if (topLayerIndex !== null) {
            const targetLayer = getCurrentFrame().layers[topLayerIndex];
            if (targetLayer.grid[y][x] !== null) {
                targetLayer.grid[y][x] = null;
                return true;
            }
        }

        return false;
    }

    if (activeLayer.locked) return false;

    if (activeLayer.grid[y][x] !== color) {
        activeLayer.grid[y][x] = color;
        return true;
    }

    return false;
}

function paint(x, y, color) {
    if (!applyPaintNoDirty(x, y, color)) {
        return;
    }

    if (GRID_SIZE >= 256) {
        if (!patchCurrentFrameDisplayCacheForPixel(x, y)) {
            currentFrameRenderCacheDirty = true;
        }
        markLayerRangeCacheDirtyDeferred();
        expandActiveStrokeDirtyRect(x, y, x, y);
        return;
    }

    markCurrentFrameRenderCacheDirty();
}

function shouldPaintDither(x, y) {
    if (!ditherOrigin) {
        return true;
    }

    const relativeX = x - ditherOrigin.x;
    const relativeY = y - ditherOrigin.y;

    return (relativeX + relativeY) % 2 === 0;
}

function applyBrushAt(x, y, color) {
    if (brushType === CUSTOM_BRUSH_TYPE) {
        if (stampCustomBrushAt(x, y)) {
            markCurrentFrameRenderCacheDirty();
        }
        return;
    }

    if (brushType === "pixel") {
        paint(x, y, color);
        return;
    }

    if (brushType === "dither") {
        if (shouldPaintDither(x, y)) {
            paint(x, y, color);
        }
        return;
    }

    if (brushType === "square2") {
        for (let dx = -1; dx <= 0; dx++) {
            for (let dy = -1; dy <= 0; dy++) {
                paint(x + dx, y + dy, color);
            }
        }
        return;
    }

    if (brushType === "square4") {
        for (let dx = -2; dx < 2; dx++) {
            for (let dy = -2; dy < 2; dy++) {
                paint(x + dx, y + dy, color);
            }
        }
        return;
    }

    if (brushType === "square8") {
        for (let dx = -4; dx < 4; dx++) {
            for (let dy = -4; dy < 4; dy++) {
                paint(x + dx, y + dy, color);
            }
        }
        return;
    }

    if (brushType === "line5") {
        for (let dx = -2; dx <= 2; dx++) {
            paint(x + dx, y, color);
        }
        return;
    }

    if (brushType === "line5v") {
        for (let dy = -2; dy <= 2; dy++) {
            paint(x, y + dy, color);
        }
    }
}

function drawPixel(x, y) {
    const color = currentTool === "eraser" ? null : getNoisyColor(currentColor);

    if (brushType === CUSTOM_BRUSH_TYPE) {
        if (shouldQueueCustomBrushStamps()) {
            queueCustomBrushPointWorkerStamp(x, y, mirrorMode);
            return;
        }

        let changed = stampCustomBrushAt(x, y, GRID_SIZE >= 256);

        if (mirrorMode) {
            const mirrorX = GRID_SIZE - 1 - x;
            if (stampCustomBrushAt(mirrorX, y, GRID_SIZE >= 256)) {
                changed = true;
            }
        }

        if (changed) {
            if (GRID_SIZE >= 256) {
                const cacheCtx = getCurrentFrameDisplayCacheContext();

                if (cacheCtx) {
                    const fillState = { lastFillStyle: null };
                    patchCustomStampToDisplayCacheContext(cacheCtx, x, y, fillState);

                    if (mirrorMode) {
                        const mirrorX = GRID_SIZE - 1 - x;
                        if (mirrorX !== x) {
                            patchCustomStampToDisplayCacheContext(cacheCtx, mirrorX, y, fillState);
                        }
                    }
                } else {
                    currentFrameRenderCacheDirty = true;
                }

                markLayerRangeCacheDirtyDeferred();
                queueActiveStrokeRefresh();
            } else {
                markCurrentFrameRenderCacheDirty();
            }
        }

        return;
    }

    applyBrushAt(x, y, color);

    if (mirrorMode) {
        const mirrorX = GRID_SIZE - 1 - x;
        applyBrushAt(mirrorX, y, color);
    }
}

function drawCustomBrushLineBatch(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let stampedCount = 0;
    const maxSegmentStampCount = GRID_SIZE >= 512 ? 384 : 320;

    while (true) {
        enqueueCustomStamp(x0, y0, mirrorMode);
        stampedCount += 1;

        if (x0 === x1 && y0 === y1) {
            break;
        }

        if (stampedCount >= maxSegmentStampCount) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    queueCustomStampFlush();
}

function drawLine(x0, y0, x1, y1) {
    if (brushType === CUSTOM_BRUSH_TYPE && shouldQueueCustomBrushStamps()) {
        drawCustomBrushLineBatch(x0, y0, x1, y1);
        return;
    }

    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        drawPixel(x0, y0);

        if (x0 === x1 && y0 === y1) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function getNormalizedRectBounds(start, end) {
    if (!start || !end) return null;

    return {
        minX: Math.min(start.x, end.x),
        maxX: Math.max(start.x, end.x),
        minY: Math.min(start.y, end.y),
        maxY: Math.max(start.y, end.y)
    };
}

function drawRectangleOutline(start, end) {
    const bounds = getNormalizedRectBounds(start, end);
    if (!bounds) return;

    const { minX, maxX, minY, maxY } = bounds;

    for (let x = minX; x <= maxX; x++) {
        drawPixel(x, minY);
        if (maxY !== minY) {
            drawPixel(x, maxY);
        }
    }

    for (let y = minY + 1; y < maxY; y++) {
        drawPixel(minX, y);
        if (maxX !== minX) {
            drawPixel(maxX, y);
        }
    }
}

function drawRectangleFill(start, end) {
    const bounds = getNormalizedRectBounds(start, end);
    if (!bounds) return;

    const { minX, maxX, minY, maxY } = bounds;

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            drawPixel(x, y);
        }
    }
}

function getEllipsePixels(start, end, filled = false) {
    const bounds = getNormalizedRectBounds(start, end);
    if (!bounds) return [];

    const width = bounds.maxX - bounds.minX + 1;
    const height = bounds.maxY - bounds.minY + 1;

    if (width <= 0 || height <= 0) return [];

    const pixels = [];
    const seen = new Set();

    const addPixel = (x, y) => {
        if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) return;
        const key = `${x},${y}`;
        if (seen.has(key)) return;
        seen.add(key);
        pixels.push({ x, y });
    };

    if (width === 1 && height === 1) {
        addPixel(bounds.minX, bounds.minY);
        return pixels;
    }

    if (width <= 2 || height <= 2) {
        if (filled) {
            for (let y = bounds.minY; y <= bounds.maxY; y++) {
                for (let x = bounds.minX; x <= bounds.maxX; x++) {
                    addPixel(x, y);
                }
            }
            return pixels;
        }

        const smallOutline = [
            { x: bounds.minX, y: bounds.minY },
            { x: bounds.maxX, y: bounds.minY },
            { x: bounds.minX, y: bounds.maxY },
            { x: bounds.maxX, y: bounds.maxY }
        ];

        for (const pixel of smallOutline) {
            addPixel(pixel.x, pixel.y);
        }

        return pixels;
    }

    const radiusX = (width - 1) / 2;
    const radiusY = (height - 1) / 2;
    const centerX = bounds.minX + radiusX;
    const centerY = bounds.minY + radiusY;

    if (filled) {
        for (let y = bounds.minY; y <= bounds.maxY; y++) {
            for (let x = bounds.minX; x <= bounds.maxX; x++) {
                const nx = radiusX === 0 ? 0 : (x - centerX) / radiusX;
                const ny = radiusY === 0 ? 0 : (y - centerY) / radiusY;
                const value = (nx * nx) + (ny * ny);

                if (value <= 1.0) {
                    addPixel(x, y);
                }
            }
        }

        return pixels;
    }

    const angleSteps = Math.max(24, Math.round((width + height) * 3));

    for (let i = 0; i < angleSteps; i++) {
        const angle = (i / angleSteps) * Math.PI * 2;
        const x = Math.round(centerX + Math.cos(angle) * radiusX);
        const y = Math.round(centerY + Math.sin(angle) * radiusY);
        addPixel(x, y);
    }

    return pixels;
}

function drawEllipseOutline(start, end) {
    const pixels = getEllipsePixels(start, end, false);
    for (const pixel of pixels) {
        drawPixel(pixel.x, pixel.y);
    }
}

function drawEllipseFill(start, end) {
    const pixels = getEllipsePixels(start, end, true);
    for (const pixel of pixels) {
        drawPixel(pixel.x, pixel.y);
    }
}

function commitRectangle(start, end) {
    if (!start || !end) return;
    if (getActiveLayer().locked) return;

    saveState();

    if (rectMode === "fill") {
        drawRectangleFill(start, end);
    } else {
        drawRectangleOutline(start, end);
    }

    queueTimelineRefresh();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function commitEllipse(start, end) {
    if (!start || !end) return;
    if (getActiveLayer().locked) return;

    const bounds = getNormalizedRectBounds(start, end);
    if (!bounds) return;

    saveState();

    if (rectMode === "fill") {
        drawEllipseFill(start, end);
    } else {
        drawEllipseOutline(start, end);
    }

    queueTimelineRefresh();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function commitLineSegment(from, to) {
    if (!from || !to) return;
    if (getActiveLayer().locked) return;

    if (!lineHasCommittedSegment) {
        saveState();
        lineHasCommittedSegment = true;
    }

    ditherOrigin = { x: from.x, y: from.y };
    drawLine(from.x, from.y, to.x, to.y);
    timelineRefreshDeferred = true;
    updateHistoryUI();
    queueActiveStrokeRefresh();
}

function finishLinePath() {
    clearLinePath();
    ditherOrigin = null;
    refreshWorkspacePreview();
}

function shouldUseQueuedCustomBrushStrokePump() {
    return (
        drawing &&
        pointerDownOnCanvas &&
        brushType === CUSTOM_BRUSH_TYPE &&
        shouldQueueCustomBrushStamps()
    );
}

function queueCustomBrushStrokePump() {
    if (customBrushStrokePumpQueued) return;

    customBrushStrokePumpQueued = true;

    requestAnimationFrame(() => {
        customBrushStrokePumpQueued = false;

        if (!drawing || !pointerDownOnCanvas || !lastPixel || !pendingCustomBrushStrokePoints.length) {
            return;
        }

        const startedAt = performance.now();
        const frameBudgetMs = GRID_SIZE >= 512 ? 6 : 8;
        let processedAny = false;

        while (drawing && pointerDownOnCanvas && lastPixel && pendingCustomBrushStrokePoints.length) {
            const targetPos = pendingCustomBrushStrokePoints.shift();
            const startX = lastPixel.x;
            const startY = lastPixel.y;

            if (samePixel(lastPixel, targetPos)) {
                hoverPixel = targetPos;
                continue;
            }

            lastPixel = targetPos;
            hoverPixel = targetPos;
            processedAny = true;

            if (canUseCustomStampWorker()) {
                queueCustomBrushLineWorkerSegment(
                    startX,
                    startY,
                    targetPos.x,
                    targetPos.y,
                    mirrorMode
                );
            } else {
                drawCustomBrushLineBatch(startX, startY, targetPos.x, targetPos.y);
            }

            if (performance.now() - startedAt >= frameBudgetMs) {
                break;
            }
        }

        if (processedAny && !canUseCustomStampWorker()) {
            queueActiveStrokeRefresh();
        }

        if (pendingCustomBrushStrokePoints.length) {
            queueCustomBrushStrokePump();
        }
    });
}

function continueDrawingToPosition(pos) {
    if (!drawing || !lastPixel) return;

    if (shouldUseQueuedCustomBrushStrokePump()) {
        const lastQueuedPoint = pendingCustomBrushStrokePoints.length
            ? pendingCustomBrushStrokePoints[pendingCustomBrushStrokePoints.length - 1]
            : lastPixel;

        if (!samePixel(lastQueuedPoint, pos)) {
            pendingCustomBrushStrokePoints.push(pos);
        }

        hoverPixel = pos;
        queueCustomBrushStrokePump();
        return;
    }

    if (samePixel(lastPixel, pos)) {
        hoverPixel = pos;
        return;
    }

    drawLine(lastPixel.x, lastPixel.y, pos.x, pos.y);
    lastPixel = pos;
    hoverPixel = pos;

    if (GRID_SIZE >= 512) {
        queueWorkspacePreviewRefresh();
        return;
    }

    queueActiveStrokeRefresh();
}

function getGridStep() {
    if (GRID_SIZE <= 64) return 1;
    if (GRID_SIZE <= 128) return 2;
    if (GRID_SIZE <= 256) return 4;
    return 8;
}

function drawGrid() {
    const step = getGridStep();
    const renderDisplaySize = getRenderDisplaySize();

    for (let i = 0; i <= GRID_SIZE; i += step) {
        const pos = Math.round(i * CELL_SIZE);

        ctx.beginPath();
        ctx.strokeStyle = step === 1 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.18)";
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, renderDisplaySize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(renderDisplaySize, pos);
        ctx.stroke();
    }
}

function shouldUseCheapCustomBrushPreview() {
    if (brushType !== CUSTOM_BRUSH_TYPE || !customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return false;
    }

    if (drawing && pointerDownOnCanvas) {
        return true;
    }

    if (GRID_SIZE >= 128) {
        return true;
    }

    if (customBrushPixelCache.length >= 24) {
        return true;
    }

    return false;
}

function shouldUseFastStrokeRenderMode() {
    if (!(drawing && pointerDownOnCanvas) || GRID_SIZE < 64) {
        return false;
    }

    if (GRID_SIZE >= 512 && !gridVisible) {
        return false;
    }

    return true;
}

function getBrushPreviewInfo() {
    let width = 1;
    let height = 1;

    if (brushType === CUSTOM_BRUSH_TYPE && customStampBrush) {
        width = customStampBrush.width;
        height = customStampBrush.height;
    }

    if (brushType === "square2") {
        width = 2;
        height = 2;
    }

    if (brushType === "square4") {
        width = 4;
        height = 4;
    }

    if (brushType === "square8") {
        width = 8;
        height = 8;
    }

    if (brushType === "line5") {
        width = 5;
        height = 1;
    }

    if (brushType === "line5v") {
        width = 1;
        height = 5;
    }

    return { width, height };
}

function drawPixelPerfectCustomBrushOutline(centerX, centerY) {
    if (!customStampBrush || !customBrushPixelCache || !customBrushPixelCache.length) {
        return;
    }

    const originX = centerX - Math.floor(customStampBrush.width / 2);
    const originY = centerY - Math.floor(customStampBrush.height / 2);
    const occupied = [];
    const occupiedSet = new Set();

    for (let i = 0; i < customBrushPixelCache.length; i++) {
        const pixel = customBrushPixelCache[i];
        const drawX = originX + pixel.x;
        const drawY = originY + pixel.y;

        if (drawX < 0 || drawY < 0 || drawX >= GRID_SIZE || drawY >= GRID_SIZE) {
            continue;
        }

        occupied.push({ x: drawX, y: drawY });
        occupiedSet.add(`${drawX},${drawY}`);
    }

    const lineOffset = 0.5;

    for (let i = 0; i < occupied.length; i++) {
        const pixel = occupied[i];
        const cellX = Math.round(pixel.x * CELL_SIZE);
        const cellY = Math.round(pixel.y * CELL_SIZE);
        const cellSize = Math.max(1, Math.round(CELL_SIZE));

        const leftKey = `${pixel.x - 1},${pixel.y}`;
        const rightKey = `${pixel.x + 1},${pixel.y}`;
        const upKey = `${pixel.x},${pixel.y - 1}`;
        const downKey = `${pixel.x},${pixel.y + 1}`;

        if (!occupiedSet.has(leftKey)) {
            ctx.beginPath();
            ctx.moveTo(cellX + lineOffset, cellY + lineOffset);
            ctx.lineTo(cellX + lineOffset, cellY + cellSize - lineOffset);
            ctx.stroke();
        }

        if (!occupiedSet.has(rightKey)) {
            ctx.beginPath();
            ctx.moveTo(cellX + cellSize - lineOffset, cellY + lineOffset);
            ctx.lineTo(cellX + cellSize - lineOffset, cellY + cellSize - lineOffset);
            ctx.stroke();
        }

        if (!occupiedSet.has(upKey)) {
            ctx.beginPath();
            ctx.moveTo(cellX + lineOffset, cellY + lineOffset);
            ctx.lineTo(cellX + cellSize - lineOffset, cellY + lineOffset);
            ctx.stroke();
        }

        if (!occupiedSet.has(downKey)) {
            ctx.beginPath();
            ctx.moveTo(cellX + lineOffset, cellY + cellSize - lineOffset);
            ctx.lineTo(cellX + cellSize - lineOffset, cellY + cellSize - lineOffset);
            ctx.stroke();
        }
    }
}

function drawBrushPreview(targetCtx = ctx) {
    if (!targetCtx) return;
    if (isPlaying) return;
    if (!hoverPixel) return;
    if (currentTool !== "pencil" && currentTool !== "eraser" && currentTool !== "eyedropper") return;

    if (brushType === CUSTOM_BRUSH_TYPE && customStampBrush && customStampBrush.pixels.length) {
        const startX = Math.round((hoverPixel.x - Math.floor(customStampBrush.width / 2)) * CELL_SIZE);
        const startY = Math.round((hoverPixel.y - Math.floor(customStampBrush.height / 2)) * CELL_SIZE);
        const drawWidth = Math.max(1, Math.round(customStampBrush.width * CELL_SIZE));
        const drawHeight = Math.max(1, Math.round(customStampBrush.height * CELL_SIZE));

        targetCtx.save();
        targetCtx.strokeStyle = currentTool === "eyedropper" ? "#ffff00" : "#00ff88";
        targetCtx.lineWidth = customBrushPixelPerfectMode ? 1 : 2;

        if (customBrushPixelPerfectMode && targetCtx === ctx) {
            drawPixelPerfectCustomBrushOutline(hoverPixel.x, hoverPixel.y);
        } else if (shouldUseCheapCustomBrushPreview()) {
            targetCtx.strokeRect(startX, startY, drawWidth, drawHeight);
        } else {
            const pixels = getCustomBrushPixelsAt(hoverPixel.x, hoverPixel.y);

            for (const pixel of pixels) {
                const x = Math.round(pixel.x * CELL_SIZE);
                const y = Math.round(pixel.y * CELL_SIZE);
                const size = Math.max(1, Math.round(CELL_SIZE));
                targetCtx.strokeRect(x, y, size, size);
            }
        }

        if (mirrorMode && currentTool !== "eyedropper") {
            const mirrorX = GRID_SIZE - 1 - hoverPixel.x;
            const mirrorStartX = Math.round((mirrorX - Math.floor(customStampBrush.width / 2)) * CELL_SIZE);

            targetCtx.strokeStyle = "#ffaa00";

            if (customBrushPixelPerfectMode && targetCtx === ctx) {
                drawPixelPerfectCustomBrushOutline(mirrorX, hoverPixel.y);
            } else if (shouldUseCheapCustomBrushPreview()) {
                targetCtx.strokeRect(mirrorStartX, startY, drawWidth, drawHeight);
            } else {
                const mirrorPixels = getCustomBrushPixelsAt(mirrorX, hoverPixel.y);

                for (const pixel of mirrorPixels) {
                    const x = Math.round(pixel.x * CELL_SIZE);
                    const y = Math.round(pixel.y * CELL_SIZE);
                    const size = Math.max(1, Math.round(CELL_SIZE));
                    targetCtx.strokeRect(x, y, size, size);
                }
            }
        }

        targetCtx.restore();
        return;
    }

    const brush = getBrushPreviewInfo();

    const startX = Math.round((hoverPixel.x - Math.floor(brush.width / 2)) * CELL_SIZE);
    const startY = Math.round((hoverPixel.y - Math.floor(brush.height / 2)) * CELL_SIZE);
    const drawWidth = Math.max(1, Math.round(brush.width * CELL_SIZE));
    const drawHeight = Math.max(1, Math.round(brush.height * CELL_SIZE));

    targetCtx.strokeStyle = currentTool === "eyedropper" ? "#ffff00" : (noiseEnabled && currentTool === "pencil" ? "#ff9b2f" : "#00ff88");
    targetCtx.lineWidth = 2;
    targetCtx.strokeRect(startX, startY, drawWidth, drawHeight);

    if (mirrorMode && currentTool !== "eyedropper") {
        const mirrorX = GRID_SIZE - 1 - hoverPixel.x;
        const mirrorStartX = Math.round((mirrorX - Math.floor(brush.width / 2)) * CELL_SIZE);

        targetCtx.strokeStyle = "#ffaa00";
        targetCtx.strokeRect(mirrorStartX, startY, drawWidth, drawHeight);
    }
}

function drawLinePreview() {
    if (isPlaying) return;
    if (currentTool !== "line") return;
    if (!lineAnchor) return;
    if (!hoverPixel) return;

    const startX = Math.round((lineAnchor.x + 0.5) * CELL_SIZE);
    const startY = Math.round((lineAnchor.y + 0.5) * CELL_SIZE);
    const endX = Math.round((hoverPixel.x + 0.5) * CELL_SIZE);
    const endY = Math.round((hoverPixel.y + 0.5) * CELL_SIZE);

    ctx.save();
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    const anchorX = Math.round(lineAnchor.x * CELL_SIZE);
    const anchorY = Math.round(lineAnchor.y * CELL_SIZE);
    const hoverCellX = Math.round(hoverPixel.x * CELL_SIZE);
    const hoverCellY = Math.round(hoverPixel.y * CELL_SIZE);
    const cellDrawSize = Math.max(1, Math.round(CELL_SIZE));

    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(anchorX, anchorY, cellDrawSize, cellDrawSize);

    if (lineStartPoint) {
        const startCellX = Math.round(lineStartPoint.x * CELL_SIZE);
        const startCellY = Math.round(lineStartPoint.y * CELL_SIZE);
        ctx.strokeStyle = "#ffaa00";
        ctx.strokeRect(startCellX, startCellY, cellDrawSize, cellDrawSize);
    }

    if (samePixel(hoverPixel, lineStartPoint) && !samePixel(lineAnchor, lineStartPoint)) {
        ctx.strokeStyle = "#ff66aa";
        ctx.strokeRect(hoverCellX, hoverCellY, cellDrawSize, cellDrawSize);
    }

    ctx.restore();
}

function drawRectPreview() {
    if (isPlaying) return;
    if (currentTool !== "rect") return;
    if (!rectStart || !rectEnd) return;

    const bounds = getNormalizedRectBounds(rectStart, rectEnd);
    if (!bounds) return;

    const x = Math.round(bounds.minX * CELL_SIZE);
    const y = Math.round(bounds.minY * CELL_SIZE);
    const width = Math.max(1, Math.round((bounds.maxX - bounds.minX + 1) * CELL_SIZE));
    const height = Math.max(1, Math.round((bounds.maxY - bounds.minY + 1) * CELL_SIZE));

    ctx.save();
    ctx.strokeStyle = rectMode === "fill" ? "#ffaa00" : "#00ff88";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    if (rectMode === "fill") {
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = currentColor;
        ctx.fillRect(x, y, width, height);
    }

    ctx.restore();
}

function drawEllipsePreview() {
    if (isPlaying) return;
    if (currentTool !== "ellipse") return;
    if (!rectStart || !rectEnd) return;

    const bounds = getNormalizedRectBounds(rectStart, rectEnd);
    if (!bounds) return;

    const x = Math.round(bounds.minX * CELL_SIZE);
    const y = Math.round(bounds.minY * CELL_SIZE);
    const width = Math.max(1, Math.round((bounds.maxX - bounds.minX + 1) * CELL_SIZE));
    const height = Math.max(1, Math.round((bounds.maxY - bounds.minY + 1) * CELL_SIZE));

    ctx.save();
    ctx.strokeStyle = rectMode === "fill" ? "#ffaa00" : "#00ff88";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(
        x + width / 2,
        y + height / 2,
        Math.max(0.5, width / 2),
        Math.max(0.5, height / 2),
        0,
        0,
        Math.PI * 2
    );
    ctx.stroke();

    if (rectMode === "fill") {
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.ellipse(
            x + width / 2,
            y + height / 2,
            Math.max(0.5, width / 2),
            Math.max(0.5, height / 2),
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    ctx.restore();
}

function drawSelectionOverlay() {
    if (selectionPixels.length > 0 && selectionStart) {
        ctx.globalAlpha = 0.35;

        for (const pixel of selectionPixels) {
            const previewColor = getTopSelectionPixelColor(pixel);
            if (!previewColor) continue;

            const drawX = selectionStart.x + pixel.x;
            const drawY = selectionStart.y + pixel.y;

            if (drawX < 0 || drawY < 0 || drawX >= GRID_SIZE || drawY >= GRID_SIZE) {
                continue;
            }

            const rgb = hexToRgb(previewColor);

            const xStart = Math.floor(drawX * CELL_SIZE);
            const xEnd = Math.floor((drawX + 1) * CELL_SIZE);
            const yStart = Math.floor(drawY * CELL_SIZE);
            const yEnd = Math.floor((drawY + 1) * CELL_SIZE);

            ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            ctx.fillRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
        }

        ctx.globalAlpha = 1;
    }

    if (selectionStart && selectionEnd) {
        const minX = Math.min(selectionStart.x, selectionEnd.x);
        const maxX = Math.max(selectionStart.x, selectionEnd.x);
        const minY = Math.min(selectionStart.y, selectionEnd.y);
        const maxY = Math.max(selectionStart.y, selectionEnd.y);

        const x = Math.round(minX * CELL_SIZE);
        const y = Math.round(minY * CELL_SIZE);
        const width = Math.max(1, Math.round((maxX - minX + 1) * CELL_SIZE));
        const height = Math.max(1, Math.round((maxY - minY + 1) * CELL_SIZE));

        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
    }
}

function buildFrameDisplayCanvas(frame, displaySize = null, options = {}) {
    const outputCanvas = document.createElement("canvas");
    const outputCtx = outputCanvas.getContext("2d");
    const finalDisplaySize = displaySize || getRenderDisplaySize();

    outputCanvas.width = finalDisplaySize;
    outputCanvas.height = finalDisplaySize;

    outputCtx.clearRect(0, 0, finalDisplaySize, finalDisplaySize);
    outputCtx.imageSmoothingEnabled = false;

    const framePixelCanvas = buildFramePixelCanvas(frame, options);

    outputCtx.drawImage(
        framePixelCanvas,
        0,
        0,
        framePixelCanvas.width,
        framePixelCanvas.height,
        0,
        0,
        finalDisplaySize,
        finalDisplaySize
    );

    return outputCanvas;
}

function drawGridToContext(grid, alpha = 1) {
    if (!grid) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const color = grid[y][x];
            if (!color) continue;

            const xStart = Math.floor(x * CELL_SIZE);
            const xEnd = Math.floor((x + 1) * CELL_SIZE);
            const yStart = Math.floor(y * CELL_SIZE);
            const yEnd = Math.floor((y + 1) * CELL_SIZE);

            ctx.fillStyle = color;
            ctx.fillRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
        }
    }

    ctx.restore();
}

function drawOnionSkinFrame(frame, alphaMultiplier) {
    if (!frame) return;

    const renderDisplaySize = getRenderDisplaySize();
    const onionCanvas = buildFrameDisplayCanvas(frame, renderDisplaySize);
    ctx.save();
    ctx.globalAlpha = alphaMultiplier;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        onionCanvas,
        0,
        0,
        onionCanvas.width,
        onionCanvas.height,
        0,
        0,
        renderDisplaySize,
        renderDisplaySize
    );
    ctx.restore();
}

function drawOnionSkin() {
    if (isPlaying) return;
    if (!onionSkinEnabled) return;
    if (frames.length <= 1) return;
    if (GRID_SIZE >= 512) return;

    const previousFrame = currentFrameIndex > 0 ? frames[currentFrameIndex - 1] : null;
    const nextFrame = currentFrameIndex < frames.length - 1 ? frames[currentFrameIndex + 1] : null;

    if (previousFrame) {
        drawOnionSkinFrame(previousFrame, ONION_PREV_ALPHA);
    }

    if (nextFrame) {
        drawOnionSkinFrame(nextFrame, ONION_NEXT_ALPHA);
    }
}

function drawCurrentPixels(sourceRect = null) {
    const cacheCanvas = getCachedCurrentFrameDisplayCanvas();
    const renderDisplaySize = getRenderDisplaySize();
    const displayScale = renderDisplaySize / cacheCanvas.width;

    ctx.imageSmoothingEnabled = false;

    if (
        sourceRect &&
        Number.isFinite(sourceRect.x) &&
        Number.isFinite(sourceRect.y) &&
        Number.isFinite(sourceRect.width) &&
        Number.isFinite(sourceRect.height) &&
        sourceRect.width > 0 &&
        sourceRect.height > 0
    ) {
        const srcX = Math.floor(sourceRect.x / displayScale);
        const srcY = Math.floor(sourceRect.y / displayScale);
        const srcWidth = Math.max(1, Math.ceil(sourceRect.width / displayScale));
        const srcHeight = Math.max(1, Math.ceil(sourceRect.height / displayScale));

        ctx.drawImage(
            cacheCanvas,
            srcX,
            srcY,
            srcWidth,
            srcHeight,
            sourceRect.x,
            sourceRect.y,
            sourceRect.width,
            sourceRect.height
        );
        return;
    }

    ctx.drawImage(
        cacheCanvas,
        0,
        0,
        cacheCanvas.width,
        cacheCanvas.height,
        0,
        0,
        renderDisplaySize,
        renderDisplaySize
    );
}

function drawCurrentPixelsLayerAware() {
    if (!multiLayerModeEnabled || isPlaying || !frames.length) {
        drawCurrentPixels();
        return;
    }

    if (
        layerRangeCacheDirtyDeferred ||
        currentFrameLayerRangeCache.dirty ||
        (GRID_SIZE >= 256 && drawing && pointerDownOnCanvas)
    ) {
        drawCurrentPixels();
        return;
    }

    const renderDisplaySize = getRenderDisplaySize();
    const { lowerCanvas, upperCanvas } = getCachedCurrentFrameLayerRangeDisplayCanvases(currentLayerIndex);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(lowerCanvas, 0, 0, lowerCanvas.width, lowerCanvas.height, 0, 0, renderDisplaySize, renderDisplaySize);
    drawOnionSkin();
    ctx.drawImage(upperCanvas, 0, 0, upperCanvas.width, upperCanvas.height, 0, 0, renderDisplaySize, renderDisplaySize);
}

function drawCanvas() {
    flushDeferredLayerRangeCacheDirty();

    const renderDisplaySize = getRenderDisplaySize();
    const fastStrokeRender = shouldUseFastStrokeRenderMode();
    const allowDirtyRectFastStroke =
        !(GRID_SIZE >= 512 && !gridVisible);

    const useDirtyRectFastStroke =
        fastStrokeRender &&
        allowDirtyRectFastStroke &&
        !multiLayerModeEnabled &&
        GRID_SIZE >= 256 &&
        GRID_SIZE < 512 &&
        !!activeStrokeDirtyRect;

    if (useDirtyRectFastStroke) {
        const dirtyRect = getActiveStrokeDirtyDisplayRect();

        if (!dirtyRect || !dirtyRect.width || !dirtyRect.height) {
            clearActiveStrokeDirtyRect();
            renderPreviewOverlay();
            return;
        }

        ctx.clearRect(dirtyRect.x, dirtyRect.y, dirtyRect.width, dirtyRect.height);
        drawCurrentPixels(dirtyRect);
        clearActiveStrokeDirtyRect();
        renderPreviewOverlay();
        return;
    }

    ctx.clearRect(0, 0, renderDisplaySize, renderDisplaySize);

    const compositeWorkerKey = getCompositeRenderStateKey();
    const canUseWorkerRender =
        !fastStrokeRender &&
        !drawing &&
        !selecting &&
        !movingSelection &&
        !rectDrawing &&
        !lineAnchor &&
        !activeStrokeDirtyRect &&
        !layerRangeCacheDirtyDeferred &&
        canUseCompositeRenderWorker();

    let drewBaseComposite = false;

    if (canUseWorkerRender) {
        requestCompositeWorkerRender();
        drewBaseComposite = drawCompositeWorkerBitmap(compositeWorkerKey);
    }

    if (!drewBaseComposite) {
        if (fastStrokeRender) {
            drawCurrentPixels();
        } else if (multiLayerModeEnabled && !isPlaying) {
            drawCurrentPixelsLayerAware();
        } else {
            drawOnionSkin();
            drawCurrentPixels();
        }
    }

    if (gridVisible && !fastStrokeRender) {
        drawGrid();
    }

    if (!isPlaying) {
        if (!fastStrokeRender) {
            drawSelectionOverlay();
        }

        drawLinePreview();
        drawRectPreview();
        drawEllipsePreview();
    }

    clearActiveStrokeDirtyRect();
    renderPreviewOverlay();
}
function sampleColorAt(x, y) {
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) {
        return null;
    }

    const composite = getCompositeGrid(getCurrentFrame());
    return composite[y][x];
}

function useEyedropper(x, y) {
    const pickedColor = sampleColorAt(x, y);

    if (pickedColor) {
        setCurrentColor(pickedColor);
        currentTool = "pencil";
        updateToolUI();
    }

    refreshWorkspacePreview();
}

function floodFill(x, y) {
    const activeLayer = getActiveLayer();
    if (activeLayer.locked) return;
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return;

    const target = activeLayer.grid[y][x];
    const replacement = currentColor;

    if (target === replacement) return;

    saveState();

    const stack = [{ x, y }];

    while (stack.length) {
        const current = stack.pop();

        if (current.x < 0 || current.y < 0 || current.x >= GRID_SIZE || current.y >= GRID_SIZE) {
            continue;
        }

        if (activeLayer.grid[current.y][current.x] !== target) {
            continue;
        }

        activeLayer.grid[current.y][current.x] = replacement;

        stack.push({ x: current.x + 1, y: current.y });
        stack.push({ x: current.x - 1, y: current.y });
        stack.push({ x: current.x, y: current.y + 1 });
        stack.push({ x: current.x, y: current.y - 1 });
    }

    markCurrentFrameRenderCacheDirty();
    queueTimelineRefresh();
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function buildExportCanvasFromGrid(grid) {
    const exportCanvas = document.createElement("canvas");
    const exportCtx = exportCanvas.getContext("2d");

    exportCanvas.width = GRID_SIZE;
    exportCanvas.height = GRID_SIZE;

    exportCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
    exportCtx.imageSmoothingEnabled = false;

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const color = grid[y][x];
            if (!color) continue;

            exportCtx.fillStyle = color;
            exportCtx.fillRect(x, y, 1, 1);
        }
    }

    return exportCanvas;
}

function buildFrameExportCanvas(frame) {
    return buildFramePixelCanvas(frame);
}

function buildScaledExportCanvas(sourceCanvas, scale) {
    const safeScale = clamp(Math.round(scale), 1, MAX_EXPORT_SCALE);
    const scaledCanvas = document.createElement("canvas");
    const scaledCtx = scaledCanvas.getContext("2d");

    scaledCanvas.width = sourceCanvas.width * safeScale;
    scaledCanvas.height = sourceCanvas.height * safeScale;

    scaledCtx.imageSmoothingEnabled = false;
    scaledCtx.clearRect(0, 0, scaledCanvas.width, scaledCanvas.height);
    scaledCtx.drawImage(
        sourceCanvas,
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
        0,
        0,
        scaledCanvas.width,
        scaledCanvas.height
    );

    return scaledCanvas;
}

function getSuggestedExportScale() {
    if (GRID_SIZE <= 16) return 16;
    if (GRID_SIZE <= 32) return 8;
    if (GRID_SIZE <= 64) return 4;
    if (GRID_SIZE <= 128) return 2;
    return 1;
}

function promptExportScale(label = "Export scale", defaultScale = null) {
    const suggested = defaultScale || getSuggestedExportScale();
    const response = prompt(`${label} (1-${MAX_EXPORT_SCALE}x):`, String(suggested));
    if (response === null) return null;

    const parsed = parseInt(response, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return 1;
    }

    return clamp(parsed, 1, MAX_EXPORT_SCALE);
}

function triggerCanvasDownload(exportCanvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
}

function exportPNG() {
    openFoldoutForElement(exportButton);

    const scale = promptExportScale("PNG export scale");
    if (scale === null) return;

    const baseCanvas = buildFrameExportCanvas(getCurrentFrame());
    const exportCanvas = buildScaledExportCanvas(baseCanvas, scale);

    triggerCanvasDownload(
        exportCanvas,
        `pixel-hammer-frame-${currentFrameIndex + 1}-${GRID_SIZE}x${GRID_SIZE}@${scale}x.png`
    );
}

function renderFrameToSheetContext(sheetCtx, frame, offsetX, offsetY) {
    const frameCanvas = buildFrameExportCanvas(frame);
    sheetCtx.drawImage(frameCanvas, offsetX, offsetY);
}

function exportSpritesheetHorizontal() {
    openFoldoutForElement(exportSpritesheetButton);

    const scale = promptExportScale("Horizontal sheet export scale");
    if (scale === null) return;

    const baseCanvas = document.createElement("canvas");
    const baseCtx = baseCanvas.getContext("2d");

    baseCanvas.width = GRID_SIZE * frames.length;
    baseCanvas.height = GRID_SIZE;

    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.imageSmoothingEnabled = false;

    for (let i = 0; i < frames.length; i++) {
        renderFrameToSheetContext(baseCtx, frames[i], i * GRID_SIZE, 0);
    }

    const exportCanvas = buildScaledExportCanvas(baseCanvas, scale);

    triggerCanvasDownload(
        exportCanvas,
        `pixel-hammer-spritesheet-h-${frames.length}f-${GRID_SIZE}x${GRID_SIZE}@${scale}x.png`
    );
}

function exportSpritesheetVertical() {
    openFoldoutForElement(exportSpritesheetVerticalButton);

    const scale = promptExportScale("Vertical sheet export scale");
    if (scale === null) return;

    const baseCanvas = document.createElement("canvas");
    const baseCtx = baseCanvas.getContext("2d");

    baseCanvas.width = GRID_SIZE;
    baseCanvas.height = GRID_SIZE * frames.length;

    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.imageSmoothingEnabled = false;

    for (let i = 0; i < frames.length; i++) {
        renderFrameToSheetContext(baseCtx, frames[i], 0, i * GRID_SIZE);
    }

    const exportCanvas = buildScaledExportCanvas(baseCanvas, scale);

    triggerCanvasDownload(
        exportCanvas,
        `pixel-hammer-spritesheet-v-${frames.length}f-${GRID_SIZE}x${GRID_SIZE}@${scale}x.png`
    );
}

function exportSpritesheetWrapped() {
    openFoldoutForElement(exportSpritesheetWrappedButton);

    const defaultColumns = Math.min(4, Math.max(1, frames.length));
    const response = prompt("Wrapped spritesheet columns:", String(defaultColumns));
    if (response === null) return;

    const columns = Math.max(1, parseInt(response, 10) || defaultColumns);
    const scale = promptExportScale("Wrapped sheet export scale");
    if (scale === null) return;

    const rows = Math.ceil(frames.length / columns);

    const baseCanvas = document.createElement("canvas");
    const baseCtx = baseCanvas.getContext("2d");

    baseCanvas.width = columns * GRID_SIZE;
    baseCanvas.height = rows * GRID_SIZE;

    baseCtx.clearRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.imageSmoothingEnabled = false;

    for (let i = 0; i < frames.length; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        renderFrameToSheetContext(baseCtx, frames[i], col * GRID_SIZE, row * GRID_SIZE);
    }

    const exportCanvas = buildScaledExportCanvas(baseCanvas, scale);

    triggerCanvasDownload(
        exportCanvas,
        `pixel-hammer-spritesheet-wrap-${columns}c-${frames.length}f-${GRID_SIZE}x${GRID_SIZE}@${scale}x.png`
    );
}

function loadImageFileAsExactGrid(file, onSuccess) {
    if (!file || isPlaying) return;

    const reader = new FileReader();

    reader.onload = () => {
        const image = new Image();

        image.onload = () => {
            if (image.width !== GRID_SIZE || image.height !== GRID_SIZE) {
                alert(`Import failed. Image must be exactly ${GRID_SIZE}x${GRID_SIZE} pixels for the current canvas size.`);
                return;
            }

            const sampleCanvas = document.createElement("canvas");
            const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

            sampleCanvas.width = GRID_SIZE;
            sampleCanvas.height = GRID_SIZE;

            sampleCtx.imageSmoothingEnabled = false;
            sampleCtx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
            sampleCtx.drawImage(image, 0, 0);

            const imageData = sampleCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data;
            const importedGrid = createBlankGrid();

            for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                    const index = (y * GRID_SIZE + x) * 4;
                    const r = imageData[index];
                    const g = imageData[index + 1];
                    const b = imageData[index + 2];
                    const a = imageData[index + 3];

                    if (a === 0) {
                        importedGrid[y][x] = null;
                    } else {
                        importedGrid[y][x] = `#${[r, g, b].map(value => value.toString(16).padStart(2, "0")).join("")}`;
                    }
                }
            }

            onSuccess(importedGrid);
        };

        image.src = reader.result;
    };

    reader.readAsDataURL(file);
}

function importImageIntoCurrentFrame(file) {
    loadImageFileAsExactGrid(file, (importedGrid) => {
        if (getActiveLayer().locked) {
            alert("Active layer is locked.");
            return;
        }

        saveState();
        setEditableGrid(importedGrid);
        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        openFoldoutForElement(importButton);
        renderFrameTimeline();
        updateFrameUI();
        updateHistoryUI();
        refreshWorkspacePreview();
    });
}

function importImageIntoNewFrame(file) {
    loadImageFileAsExactGrid(file, (importedGrid) => {
        saveState();

        const newFrame = createFrameDataFromLayerTemplate(getCurrentFrame().layers);
        newFrame.layers[currentLayerIndex].grid = cloneGrid(importedGrid);

        frames.splice(currentFrameIndex + 1, 0, newFrame);
        currentFrameIndex += 1;

        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        workspacePanelExpanded = true;
        openFoldoutForElement(importNewFrameButton);
        ensureTimelineShowsFrame(currentFrameIndex);
        updateFrameUI();
        updateHistoryUI();
        refreshWorkspacePreview();
    });
}

function loadImageElementFromFile(file, onSuccess) {
    if (!file || isPlaying) return;

    const reader = new FileReader();

    reader.onload = () => {
        const image = new Image();
        image.onload = () => onSuccess(image);
        image.src = reader.result;
    };

    reader.readAsDataURL(file);
}

function gridFromImageRegion(image, sx, sy, sw, sh) {
    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

    sampleCanvas.width = sw;
    sampleCanvas.height = sh;

    sampleCtx.imageSmoothingEnabled = false;
    sampleCtx.clearRect(0, 0, sw, sh);
    sampleCtx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);

    const imageData = sampleCtx.getImageData(0, 0, sw, sh).data;
    const grid = createBlankGrid();

    for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
            const index = (y * sw + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const a = imageData[index + 3];

            if (a === 0) {
                grid[y][x] = null;
            } else {
                grid[y][x] = `#${[r, g, b].map(value => value.toString(16).padStart(2, "0")).join("")}`;
            }
        }
    }

    return grid;
}

function promptSpritesheetImportOptions(image) {
    const widthResponse = prompt("Frame width:", String(GRID_SIZE));
    if (widthResponse === null) return null;
    const frameWidth = parseInt(widthResponse, 10);

    const heightResponse = prompt("Frame height:", String(GRID_SIZE));
    if (heightResponse === null) return null;
    const frameHeight = parseInt(heightResponse, 10);

    if (!Number.isFinite(frameWidth) || !Number.isFinite(frameHeight) || frameWidth <= 0 || frameHeight <= 0) {
        alert("Invalid frame size.");
        return null;
    }

    if (frameWidth !== GRID_SIZE || frameHeight !== GRID_SIZE) {
        alert(`No scaling is enabled. Frame size must be exactly ${GRID_SIZE}x${GRID_SIZE}.`);
        return null;
    }

    const layoutResponse = prompt("Layout: horizontal / vertical / grid", "horizontal");
    if (layoutResponse === null) return null;
    const layout = layoutResponse.trim().toLowerCase();

    if (!["horizontal", "vertical", "grid"].includes(layout)) {
        alert("Layout must be horizontal, vertical, or grid.");
        return null;
    }

    let columns = 0;
    if (layout === "grid") {
        const defaultColumns = Math.max(1, Math.floor(image.width / frameWidth));
        const columnsResponse = prompt("Grid columns:", String(defaultColumns));
        if (columnsResponse === null) return null;
        columns = Math.max(1, parseInt(columnsResponse, 10) || defaultColumns);
    }

    const countResponse = prompt("Optional frame count (leave blank for all):", "");
    if (countResponse === null) return null;

    const frameCount = countResponse.trim() === "" ? null : Math.max(1, parseInt(countResponse, 10) || 1);

    return {
        frameWidth,
        frameHeight,
        layout,
        columns,
        frameCount
    };
}

function importSpritesheet(file) {
    if (getActiveLayer().locked) {
        alert("Active layer is locked.");
        return;
    }

    loadImageElementFromFile(file, (image) => {
        const options = promptSpritesheetImportOptions(image);
        if (!options) return;

        const { frameWidth, frameHeight, layout, columns, frameCount } = options;

        const slices = [];

        if (layout === "horizontal") {
            const maxFrames = Math.floor(image.width / frameWidth);
            const total = frameCount ? Math.min(frameCount, maxFrames) : maxFrames;

            for (let i = 0; i < total; i++) {
                slices.push({
                    sx: i * frameWidth,
                    sy: 0,
                    sw: frameWidth,
                    sh: frameHeight
                });
            }
        }

        if (layout === "vertical") {
            const maxFrames = Math.floor(image.height / frameHeight);
            const total = frameCount ? Math.min(frameCount, maxFrames) : maxFrames;

            for (let i = 0; i < total; i++) {
                slices.push({
                    sx: 0,
                    sy: i * frameHeight,
                    sw: frameWidth,
                    sh: frameHeight
                });
            }
        }

        if (layout === "grid") {
            const cols = Math.max(1, columns);
            const rows = Math.floor(image.height / frameHeight);
            const maxFrames = cols * rows;
            const total = frameCount ? Math.min(frameCount, maxFrames) : maxFrames;

            for (let i = 0; i < total; i++) {
                const col = i % cols;
                const row = Math.floor(i / cols);

                slices.push({
                    sx: col * frameWidth,
                    sy: row * frameHeight,
                    sw: frameWidth,
                    sh: frameHeight
                });
            }
        }

        const validSlices = slices.filter(slice =>
            slice.sx + slice.sw <= image.width &&
            slice.sy + slice.sh <= image.height
        );

        if (!validSlices.length) {
            alert("No valid frames found in the spritesheet.");
            return;
        }

        saveState();

        const newFrames = validSlices.map(slice => {
            const frame = createFrameDataFromLayerTemplate(getCurrentFrame().layers);
            frame.layers[currentLayerIndex].grid = gridFromImageRegion(
                image,
                slice.sx,
                slice.sy,
                slice.sw,
                slice.sh
            );
            return frame;
        });

        frames.splice(currentFrameIndex + 1, 0, ...newFrames);
        currentFrameIndex += 1;

        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        workspacePanelExpanded = true;
        openFoldoutForElement(importSpritesheetButton);
        ensureTimelineShowsFrame(currentFrameIndex);
        updateFrameUI();
        updateHistoryUI();
        refreshWorkspacePreview();
    });
}

function buildTilePreviewPatternCanvas() {
    const patternPixelsWide = GRID_SIZE * 3 + TILE_PREVIEW_GAP * 2;
    const patternPixelsHigh = GRID_SIZE * 3 + TILE_PREVIEW_GAP * 2;

    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");

    patternCanvas.width = patternPixelsWide;
    patternCanvas.height = patternPixelsHigh;

    patternCtx.clearRect(0, 0, patternPixelsWide, patternPixelsHigh);
    patternCtx.fillStyle = "#111";
    patternCtx.fillRect(0, 0, patternPixelsWide, patternPixelsHigh);
    patternCtx.imageSmoothingEnabled = false;

    const frameCanvas = buildFrameExportCanvas(getCurrentFrame());

    for (let ty = 0; ty < 3; ty++) {
        for (let tx = 0; tx < 3; tx++) {
            const tileOriginX = tx * (GRID_SIZE + TILE_PREVIEW_GAP);
            const tileOriginY = ty * (GRID_SIZE + TILE_PREVIEW_GAP);

            patternCtx.drawImage(frameCanvas, tileOriginX, tileOriginY);
        }
    }

    return patternCanvas;
}

function drawTilePreview() {
    if (!tileCtx || !tileCanvas) return;

    const width = tileCanvas.width;
    const height = tileCanvas.height;

    tileCtx.clearRect(0, 0, width, height);
    tileCtx.imageSmoothingEnabled = false;

    const patternCanvas = buildTilePreviewPatternCanvas();

    const availableWidth = Math.max(1, width - TILE_PREVIEW_MARGIN * 2);
    const availableHeight = Math.max(1, height - TILE_PREVIEW_MARGIN * 2);

    const scale = Math.min(
        availableWidth / patternCanvas.width,
        availableHeight / patternCanvas.height
    );

    const drawWidth = Math.max(1, Math.floor(patternCanvas.width * scale));
    const drawHeight = Math.max(1, Math.floor(patternCanvas.height * scale));
    const drawX = Math.floor((width - drawWidth) / 2);
    const drawY = Math.floor((height - drawHeight) / 2);

    tileCtx.fillStyle = "#111";
    tileCtx.fillRect(drawX, drawY, drawWidth, drawHeight);

    tileCtx.drawImage(
        patternCanvas,
        0,
        0,
        patternCanvas.width,
        patternCanvas.height,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    );
}

function insideSelection(pos) {
    if (!selectionStart || !selectionEnd) return false;

    const minX = Math.min(selectionStart.x, selectionEnd.x);
    const maxX = Math.max(selectionStart.x, selectionEnd.x);
    const minY = Math.min(selectionStart.y, selectionEnd.y);
    const maxY = Math.max(selectionStart.y, selectionEnd.y);

    return pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY;
}

function detachFloatingSelectionToMove() {
    if (!selectionPixels.length || !selectionStart) return;
    if (selectionDetachedFromCanvas) return;

    saveState();
    selectionMoveStateSaved = true;
    removeSelectionFromCanvas();
    selectionDetachedFromCanvas = true;
    markCurrentFrameRenderCacheDirty();
}

function nudgeFloatingSelection(dx, dy) {
    if (isPlaying) return;
    if (currentTool !== "select") return;
    if (!selectionPixels.length || !selectionStart || !selectionEnd) return;
    if (!Number.isFinite(dx) || !Number.isFinite(dy) || (!dx && !dy)) return;

    detachFloatingSelectionToMove();

    selectionStart = {
        x: selectionStart.x + dx,
        y: selectionStart.y + dy
    };

    selectionEnd = {
        x: selectionEnd.x + dx,
        y: selectionEnd.y + dy
    };

    movingSelection = false;
    selecting = false;
    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function commitFloatingSelection() {
    const frame = getCurrentFrame();

    if (!selectionStart || !selectionPixels.length) {
        return;
    }

    for (const pixel of selectionPixels) {
        if (!pixel.layers || !pixel.layers.length) continue;

        const x = selectionStart.x + pixel.x;
        const y = selectionStart.y + pixel.y;

        if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) {
            continue;
        }

        for (const layerPixel of pixel.layers) {
            const targetLayer = getLayerAtIndex(frame, layerPixel.layerIndex);
            if (!targetLayer || targetLayer.locked) continue;

            targetLayer.grid[y][x] = layerPixel.color;
        }
    }

    selectionDetachedFromCanvas = false;
    markCurrentFrameRenderCacheDirty();
    queueTimelineRefresh();
}

function captureSelection() {
    if (!selectionStart || !selectionEnd) return;

    selectionPixels = [];

    const minX = Math.min(selectionStart.x, selectionEnd.x);
    const maxX = Math.max(selectionStart.x, selectionEnd.x);
    const minY = Math.min(selectionStart.y, selectionEnd.y);
    const maxY = Math.max(selectionStart.y, selectionEnd.y);

    selectionWidth = maxX - minX + 1;
    selectionHeight = maxY - minY + 1;

    selectionStart = { x: minX, y: minY };
    originalSelectionStart = { x: minX, y: minY };
    selectionEnd = { x: maxX, y: maxY };
    selectionDetachedFromCanvas = false;

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const pixelLayers = getSelectablePixelStackAt(x, y);
            if (!pixelLayers.length) continue;

            selectionPixels.push({
                x: x - minX,
                y: y - minY,
                layers: pixelLayers,
                topColor: pixelLayers[pixelLayers.length - 1].color
            });
        }
    }

    if (customBrushArmed) {
        const nextBrush = buildCustomBrushFromSelectionPixels();
        const previousBrushJson = JSON.stringify(serializeCustomStampBrush());
        const nextBrushJson = JSON.stringify(nextBrush);

        if (previousBrushJson !== nextBrushJson) {
            saveState();
            setCustomStampBrush(nextBrush);
            updateHistoryUI();
        }

        brushType = nextBrush ? CUSTOM_BRUSH_TYPE : "pixel";
        customBrushArmed = false;
        currentTool = "pencil";
        clearSelection();
        updateToolUI();
    }

    updateBrushUI();
    refreshWorkspacePreview();
}

function applySelection() {
    commitFloatingSelection();

    originalSelectionStart = { ...selectionStart };
    selectionEnd = {
        x: selectionStart.x + selectionWidth - 1,
        y: selectionStart.y + selectionHeight - 1
    };

    movingSelection = false;
    selecting = false;
    selectionMoveStateSaved = false;

    updateFrameUI();
    updateHistoryUI();
    refreshWorkspacePreview();
}

function removeSelectionFromCanvas() {
    const frame = getCurrentFrame();

    for (const pixel of selectionPixels) {
        if (!pixel.layers || !pixel.layers.length) continue;

        const x = originalSelectionStart.x + pixel.x;
        const y = originalSelectionStart.y + pixel.y;

        if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) {
            continue;
        }

        for (const layerPixel of pixel.layers) {
            if (layerPixel.layerIndex === null || layerPixel.layerIndex === undefined) continue;

            const layer = getLayerAtIndex(frame, layerPixel.layerIndex);
            if (!layer || layer.locked) continue;

            layer.grid[y][x] = null;
        }
    }

    markCurrentFrameRenderCacheDirty();
}

function undo() {
    if (!undoStack.length || isPlaying) return;

    redoStack.push(createHistoryState());
    applyHistoryState(undoStack.pop());
}

function redo() {
    if (!redoStack.length || isPlaying) return;

    undoStack.push(createHistoryState());
    applyHistoryState(redoStack.pop());
}

function updateToolUI() {
    if (pencilButton) pencilButton.classList.remove("activeTool");
    if (lineButton) lineButton.classList.remove("activeTool");
    if (fillButton) fillButton.classList.remove("activeTool");
    if (eraserButton) eraserButton.classList.remove("activeTool");
    if (selectButton) selectButton.classList.remove("activeTool");
    if (eyedropperButton) eyedropperButton.classList.remove("activeTool");
    if (rectButton) rectButton.classList.remove("activeTool");
    if (ellipseButton) ellipseButton.classList.remove("activeTool");

    if (currentTool === "pencil" && pencilButton) pencilButton.classList.add("activeTool");
    if (currentTool === "line" && lineButton) lineButton.classList.add("activeTool");
    if (currentTool === "fill" && fillButton) fillButton.classList.add("activeTool");
    if (currentTool === "eraser" && eraserButton) eraserButton.classList.add("activeTool");
    if (currentTool === "select" && selectButton) selectButton.classList.add("activeTool");
    if (currentTool === "eyedropper" && eyedropperButton) eyedropperButton.classList.add("activeTool");
    if (currentTool === "rect" && rectButton) rectButton.classList.add("activeTool");
    if (currentTool === "ellipse" && ellipseButton) ellipseButton.classList.add("activeTool");

    updateNoiseUI();
}

function updateBrushUI() {
    syncCustomBrushToCurrentCanvasSize();
    updateCustomBrushOption();
    ensureCustomBrushUtilityControlsExist();

    const hasCustomBrush =
        !!(customStampBrush && customStampBrush.pixels && customStampBrush.pixels.length);

    if (brushSelect) {
        if (![...brushSelect.options].some((option) => option.value === "square8")) {
            const square8Option = document.createElement("option");
            square8Option.value = "square8";
            square8Option.textContent = "8x8 Square";
            brushSelect.appendChild(square8Option);
        }

        if (brushType === CUSTOM_BRUSH_TYPE && !hasCustomBrush && !customBrushArmed) {
            brushType = "pixel";
        }

        brushSelect.value = brushType;
        brushSelect.disabled = isPlaying;
    }

    if (unloadCustomBrushButton) {
        unloadCustomBrushButton.disabled = isPlaying;
    }

    if (pixelPerfectCustomBrushButton) {
        pixelPerfectCustomBrushButton.disabled = isPlaying || !hasCustomBrush;
        pixelPerfectCustomBrushButton.classList.toggle("activeTool", customBrushPixelPerfectMode);
        pixelPerfectCustomBrushButton.textContent = customBrushPixelPerfectMode ? "Pixel Perfect: ON" : "Pixel Perfect: OFF";
    }

    if (customBrushUtilityPanelBlock) {
        customBrushUtilityPanelBlock.style.display = hasCustomBrush ? "grid" : "none";
    }

    if (rectModeSelect) {
        rectModeSelect.value = rectMode;
    }

    syncShapeModeRadios();
}

function setBrush(type) {
    if (brushType !== type && pendingCustomStampQueue.length) {
        pendingCustomStampQueue = [];
        pendingCustomStampKeySet.clear();
        customStampFlushQueued = false;
        clearActiveStrokeDirtyRect();
    }

    if (type === CUSTOM_BRUSH_TYPE) {
        const hasCustomBrush =
            !!(customStampBrush && customStampBrush.pixels && customStampBrush.pixels.length);

        if (!hasCustomBrush) {
            customBrushArmed = true;
            brushType = CUSTOM_BRUSH_TYPE;

            if (!customBrushHintShown) {
                customBrushHintShown = true;
                alert("Highlight the area with the selection tool to pick the custom brush.");
            }

            setTool("select");
            updateBrushUI();
            refreshWorkspacePreview();
            return;
        }

        customBrushArmed = false;

        if (currentTool !== "pencil") {
            currentTool = "pencil";
            updateToolUI();
        }

        brushType = CUSTOM_BRUSH_TYPE;
        updateBrushUI();
        refreshWorkspacePreview();
        return;
    }

    customBrushArmed = false;
    brushType = type;
    lastStandardBrushType = type;
    updateBrushUI();
    refreshWorkspacePreview();
}

window.setBrush = setBrush;

function setTool(toolName) {
    if (isPlaying) return;

    if (currentTool !== toolName && pendingCustomStampQueue.length) {
        pendingCustomStampQueue = [];
        pendingCustomStampKeySet.clear();
        customStampFlushQueued = false;
        clearActiveStrokeDirtyRect();
    }

    if (currentTool === "select" && toolName !== "select" && selectionPixels.length > 0 && !movingSelection && !selecting) {
        commitFloatingSelection();
        clearSelection();
        updateFrameUI();
        updateHistoryUI();
    }

    if (customBrushArmed && toolName !== "select") {
        customBrushArmed = false;
        if (brushType === CUSTOM_BRUSH_TYPE && (!customStampBrush || !customStampBrush.pixels || !customStampBrush.pixels.length)) {
            brushType = "pixel";
        }
        updateBrushUI();
    }

    if (toolName === "eraser" && brushType === CUSTOM_BRUSH_TYPE) {
        brushType = lastStandardBrushType || "pixel";
        updateBrushUI();
    }

    currentTool = toolName;

    if (toolName !== "line") {
        clearLinePath();
    }

    if (toolName !== "rect" && toolName !== "ellipse") {
        clearRectState();
    }

    updateToolUI();
    refreshWorkspacePreview();
}

if (pencilButton) pencilButton.onclick = () => setTool("pencil");
if (lineButton) lineButton.onclick = () => setTool("line");
if (fillButton) fillButton.onclick = () => setTool("fill");
if (eraserButton) eraserButton.onclick = () => setTool("eraser");
if (selectButton) selectButton.onclick = () => setTool("select");
if (eyedropperButton) eyedropperButton.onclick = () => setTool("eyedropper");

if (mirrorButton) {
    mirrorButton.onclick = () => {
        if (isPlaying) return;
        mirrorMode = !mirrorMode;
        mirrorButton.classList.toggle("activeTool", mirrorMode);
        openFoldoutForElement(mirrorButton);
        refreshWorkspacePreview();
    };
}

if (gridButton) {
    gridButton.onclick = () => {
        gridVisible = !gridVisible;
        gridButton.classList.toggle("activeTool", gridVisible);
        openFoldoutForElement(gridButton);
        refreshWorkspacePreview();
    };
}

if (importButton) {
    importButton.onclick = () => {
        if (isPlaying || !importPNGInput) return;
        openFoldoutForElement(importButton);
        importPNGInput.value = "";
        importPNGInput.click();
    };
}

if (importPNGInput) {
    importPNGInput.onchange = () => {
        const file = importPNGInput.files && importPNGInput.files[0];
        if (!file) return;
        importImageIntoCurrentFrame(file);
    };
}

if (importNewFrameButton) {
    importNewFrameButton.onclick = () => {
        if (isPlaying || !importPNGNewFrameInput) return;
        openFoldoutForElement(importNewFrameButton);
        importPNGNewFrameInput.value = "";
        importPNGNewFrameInput.click();
    };
}

if (importPNGNewFrameInput) {
    importPNGNewFrameInput.onchange = () => {
        const file = importPNGNewFrameInput.files && importPNGNewFrameInput.files[0];
        if (!file) return;
        importImageIntoNewFrame(file);
    };
}

if (importSpritesheetButton) {
    importSpritesheetButton.onclick = () => {
        if (isPlaying || !importSpritesheetInput) return;
        openFoldoutForElement(importSpritesheetButton);
        importSpritesheetInput.value = "";
        importSpritesheetInput.click();
    };
}

if (importSpritesheetInput) {
    importSpritesheetInput.onchange = () => {
        const file = importSpritesheetInput.files && importSpritesheetInput.files[0];
        if (!file) return;
        importSpritesheet(file);
    };
}

if (exportButton) {
    exportButton.onclick = () => exportPNG();
}

if (exportSpritesheetButton) {
    exportSpritesheetButton.onclick = () => exportSpritesheetHorizontal();
}

if (exportSpritesheetVerticalButton) {
    exportSpritesheetVerticalButton.onclick = () => exportSpritesheetVertical();
}

if (exportSpritesheetWrappedButton) {
    exportSpritesheetWrappedButton.onclick = () => exportSpritesheetWrapped();
}

if (previewButton) {
    previewButton.onclick = () => {
        openFoldoutForElement(previewButton);
        currentWorkspaceMode = "tileset";
        updateWorkspaceModeUI();
        drawTilePreview();
    };
}

if (playAnimationButton) {
    playAnimationButton.onclick = () => startPlayback();
}

if (stopAnimationButton) {
    stopAnimationButton.onclick = () => stopPlayback(true);
}

if (playbackModeSelect) {
    playbackModeSelect.onchange = () => {
        playbackMode = getPlaybackMode();
        openFoldoutForElement(playbackModeSelect);
        updatePlaybackUI();
    };
}

if (decreaseFrameDurationButton) {
    decreaseFrameDurationButton.onclick = () => stepCurrentFrameDuration(-1);
}

if (increaseFrameDurationButton) {
    increaseFrameDurationButton.onclick = () => stepCurrentFrameDuration(1);
}

if (frameDurationInput) {
    frameDurationInput.onchange = () => {
        setCurrentFrameDuration(frameDurationInput.value);
    };
}

if (generateVariantButton) {
    generateVariantButton.onclick = () => generateVariant();
}

if (rerollVariantButton) {
    rerollVariantButton.onclick = () => rerollVariant();
}

if (variantModeSelect) {
    variantModeSelect.onchange = () => {
        lastVariantMode = getVariantMode();
        updateVariantStatus(`Ready · ${lastVariantMode === "wild" ? "Wild" : "Safe"} · Noise ${variantIncludeNoise ? "ON" : "OFF"}`);
        openFoldoutForElement(variantModeSelect);
    };
}

if (zoomInButton) {
    zoomInButton.onclick = () => {
        openFoldoutForElement(zoomInButton);
        setZoomLevel(zoomLevel * 1.25);
    };
}

if (zoomOutButton) {
    zoomOutButton.onclick = () => {
        openFoldoutForElement(zoomOutButton);
        setZoomLevel(zoomLevel / 1.25);
    };
}

if (zoomResetButton) {
    zoomResetButton.onclick = () => {
        openFoldoutForElement(zoomResetButton);
        setZoomLevel(1, { recenter: true });
    };
}

if (prevFrameButton) {
    prevFrameButton.onclick = () => {
        if (isPlaying) return;
        if (currentFrameIndex > 0) {
            loadFrame(currentFrameIndex - 1);
        }
    };
}

if (nextFrameButton) {
    nextFrameButton.onclick = () => {
        if (isPlaying) return;
        if (currentFrameIndex < frames.length - 1) {
            loadFrame(currentFrameIndex + 1);
        }
    };
}

if (moveFrameLeftButton) {
    moveFrameLeftButton.onclick = () => handleFrameArrowControl(-1);
}

if (moveFrameRightButton) {
    moveFrameRightButton.onclick = () => handleFrameArrowControl(1);
}

if (toggleLayerModeButton) {
    toggleLayerModeButton.onclick = () => {
        multiLayerModeEnabled = !multiLayerModeEnabled;
        if (!multiLayerModeEnabled) {
            advancedLayerControlsExpanded = false;
        }
        openFoldoutForElement(toggleLayerModeButton);
        updateLayerUI();
        refreshWorkspacePreview();
    };
}

if (addLayerButton) {
    addLayerButton.onclick = () => addLayer();
}

if (deleteLayerButton) {
    deleteLayerButton.onclick = () => deleteLayer();
}

if (addFrameButton) addFrameButton.onclick = () => addFrame();
if (duplicateFrameButton) duplicateFrameButton.onclick = () => duplicateFrame();
if (deleteFrameButton) deleteFrameButton.onclick = () => deleteFrame();

if (savePaletteColorButton) {
    savePaletteColorButton.onclick = () => addCurrentColorToPalette();
}

if (clearPaletteButton) {
    clearPaletteButton.onclick = () => clearSavedPalette();
}

if (toggleColorPanelButton) {
    toggleColorPanelButton.onclick = () => {
        colorPanelVisible = !colorPanelVisible;
        updateColorPanelUI();
    };
}

function applyProjectData(projectState) {
    if (!projectState) return;

    stopPlayback(false);

    GRID_SIZE = projectState.gridSize;
    CELL_SIZE = getRenderDisplaySize() / GRID_SIZE;

    frames = cloneFramesData(projectState.frames);
    currentFrameIndex = projectState.currentFrameIndex;
    currentLayerIndex = projectState.currentLayerIndex;
    timelineStartIndex = 0;
    frameMoveSelectionIndex = currentFrameIndex;

    framesUnlocked = projectState.workspace.framesUnlocked;
    workspacePanelExpanded = projectState.workspace.workspacePanelExpanded;
    colorPanelVisible = projectState.workspace.colorPanelVisible;
    multiLayerModeEnabled = projectState.workspace.multiLayerModeEnabled;
    advancedLayerControlsExpanded = projectState.workspace.advancedLayerControlsExpanded;
    onionSkinEnabled = GRID_SIZE >= 512 ? false : projectState.workspace.onionSkinEnabled;
    currentWorkspaceMode = projectState.workspace.currentWorkspaceMode;
    playbackMode = projectState.workspace.playbackMode;
    rectMode = projectState.workspace.rectMode;
    noiseEnabled = projectState.workspace.noiseEnabled;
    noiseStrength = projectState.workspace.noiseStrength;
    noiseDensity = projectState.workspace.noiseDensity;
    variantIncludeNoise = projectState.workspace.variantIncludeNoise;
    setCustomStampBrush(projectState.customStampBrush);
    syncCustomBrushToCurrentCanvasSize();
    customBrushArmed = false;
    lastStandardBrushType = projectState.workspace.lastStandardBrushType || "pixel";
    brushType = projectState.workspace.brushType === CUSTOM_BRUSH_TYPE ? CUSTOM_BRUSH_TYPE : projectState.workspace.brushType;

    if (brushType === CUSTOM_BRUSH_TYPE && (!customStampBrush || !customStampBrush.pixels || !customStampBrush.pixels.length)) {
        brushType = "pixel";
    }

    playbackDirection = 1;
    playbackTimelineFrozenIndex = currentFrameIndex;

    undoStack = [];
    redoStack = [];
    hoverPixel = null;
    ditherOrigin = null;
    layerOpacityInteractionSaved = false;
    layerRangeCacheDirtyDeferred = false;

    drawing = false;
    selecting = false;
    movingSelection = false;
    selectionDetachedFromCanvas = false;
    rectDrawing = false;
    rectStart = null;
    rectEnd = null;
    resetPointerStrokeState();

    clearSelection();
    clearLinePath();
    clearFrameDragState();
    clearCurrentFrameRenderCache();

    if (canvasSizeSelector) {
        canvasSizeSelector.value = String(GRID_SIZE);
    }

    if (playbackModeSelect) {
        playbackModeSelect.value = playbackMode;
    }

    if (rectModeSelect) {
        rectModeSelect.value = rectMode;
    }

    updateBrushUI();
    updateToolUI();
    ensureTimelineShowsFrame(currentFrameIndex);
    openFoldoutForElement(loadProjectButton || previewPanel);
    applyCanvasZoom();
    centerCanvasViewport();
    updateZoomLabel();
    updateFrameReorderUI();
    updateWorkspaceModeUI();
    updateOnionSkinUI();
    updateFrameUI();
    updatePlaybackUI();
    updateHistoryUI();
    updateLayerUI();
    updateNoiseUI();
    updateVariantNoiseUI();

    if (tileCtx && tileCanvas) {
        tileCtx.clearRect(0, 0, tileCanvas.width, tileCanvas.height);
    }

    requestAnimationFrame(() => {
        updateBrushUI();
        updateToolUI();
        forceImmediateCanvasRefresh();
    });
}

if (showFramesModeButton) {
    showFramesModeButton.onclick = () => {
        currentWorkspaceMode = "frames";
        openFoldoutForElement(showFramesModeButton);
        updateWorkspaceModeUI();
        updateFrameUI();
        refreshWorkspacePreview();
    };
}

if (showTilesetModeButton) {
    showTilesetModeButton.onclick = () => {
        currentWorkspaceMode = "tileset";
        openFoldoutForElement(showTilesetModeButton);
        updateWorkspaceModeUI();
        refreshWorkspacePreview();
    };
}

if (toggleWorkspacePanelButton) {
    toggleWorkspacePanelButton.onclick = () => {
        if (frames.length <= 1) return;

        if (workspacePanelExpanded && !colorPanelVisible) {
            colorPanelVisible = true;
            updateColorPanelUI();
        }

        workspacePanelExpanded = !workspacePanelExpanded;
        openFoldoutForElement(toggleWorkspacePanelButton);
        updateWorkspacePanelUI();
        updateLeftFrameNavUI();

        if (currentWorkspaceMode === "frames" && workspacePanelExpanded) {
            updateFrameUI();
        }

        refreshWorkspacePreview();
    };
}

if (frameReorderToggleButton) {
    frameReorderToggleButton.onclick = () => {
        if (frames.length <= 1) return;

        framesUnlocked = !framesUnlocked;
        syncFrameMoveSelectionToCurrentFrame();

        openFoldoutForElement(frameReorderToggleButton);
        clearFrameDragState();
        updateFrameReorderUI();
        updateFrameUI();
        refreshWorkspacePreview();
    };
}

if (timelinePrevButton) {
    timelinePrevButton.onclick = () => {
        if (isPlaying) return;
        if (!workspacePanelExpanded) return;
        if (frames.length <= 1) return;
        shiftTimelineWindow(-1);
    };
}

if (timelineNextButton) {
    timelineNextButton.onclick = () => {
        if (isPlaying) return;
        if (!workspacePanelExpanded) return;
        if (frames.length <= 1) return;
        shiftTimelineWindow(1);
    };
}

if (brushSelect) {
    brushSelect.onchange = () => {
        openFoldoutForElement(brushSelect);
        setBrush(brushSelect.value);
    };
}

if (fpsInput) {
    fpsInput.onchange = () => {
        fpsInput.value = clampFps(parseInt(fpsInput.value, 10) || 6);
        openFoldoutForElement(fpsInput);
        updatePlaybackUI();
    };
}

if (canvasSizeSelector) {
    canvasSizeSelector.onchange = () => {
        stopPlayback(false);

        GRID_SIZE = parseInt(canvasSizeSelector.value, 10);
        CELL_SIZE = DISPLAY_SIZE / GRID_SIZE;

        frames = [createFrameDataFromLayerTemplate()];
        currentFrameIndex = 0;
        currentLayerIndex = 0;
        timelineStartIndex = 0;
        framesUnlocked = false;
        workspacePanelExpanded = false;
        onionSkinEnabled = GRID_SIZE >= 512 ? false : true;
        multiLayerModeEnabled = false;
        advancedLayerControlsExpanded = false;
        playbackMode = "loop";
        playbackDirection = 1;
        playbackTimelineFrozenIndex = 0;
        colorPanelVisible = true;
        rectMode = "outline";
        noiseEnabled = false;
        noiseStrength = 28;
        noiseDensity = 72;
        variantIncludeNoise = false;
        syncCustomBrushToCurrentCanvasSize();

        if (brushType === CUSTOM_BRUSH_TYPE && (!customStampBrush || !customStampBrush.pixels || !customStampBrush.pixels.length)) {
            brushType = "pixel";
        }

        undoStack = [];
        redoStack = [];
        hoverPixel = null;
        ditherOrigin = null;
        layerOpacityInteractionSaved = false;
        resetPointerStrokeState();

        clearSelection();
        clearLinePath();
        clearRectState();
        clearFrameDragState();
        syncFrameMoveSelectionToCurrentFrame();
        clearCurrentFrameRenderCache();
        openFoldoutForElement(canvasSizeSelector);
        setZoomLevel(1, { recenter: true });
        updateFrameReorderUI();
        updateWorkspaceModeUI();
        updateOnionSkinUI();
        updateFrameUI();
        updatePlaybackUI();
        updateHistoryUI();
        updateLayerUI();
        updateNoiseUI();
        updateVariantNoiseUI();
        updateBrushUI();

        if (playbackModeSelect) {
            playbackModeSelect.value = "loop";
        }

        if (rectModeSelect) {
            rectModeSelect.value = "outline";
        }

        syncShapeModeRadios();

        if (tileCtx && tileCanvas) {
            tileCtx.clearRect(0, 0, tileCanvas.width, tileCanvas.height);
        }

        refreshWorkspacePreview();
    };
}

if (colorPicker) {
    colorPicker.oninput = () => {
        openFoldoutForElement(colorPicker);
        setCurrentColor(colorPicker.value);
        refreshWorkspacePreview();
    };
}

if (shadeBarCanvas) {
    shadeBarCanvas.addEventListener("mousedown", (e) => {
        const rect = shadeBarCanvas.getBoundingClientRect();
        const scaleX = shadeBarCanvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scaleX;

        const picked = getShadeBarColorAt(mouseX);
        openFoldoutForElement(shadeBarCanvas);
        handleUIColorPick(picked);
    });
}

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

canvas.addEventListener("pointerdown", (e) => {
    if (isPlaying) return;

    if (
        getActiveLayer().locked &&
        (currentTool === "pencil" || currentTool === "fill" || currentTool === "line" || currentTool === "rect" || currentTool === "ellipse")
    ) {
        return;
    }

    const pos = getMousePosition(e);
    hoverPixel = pos;
    pointerDownOnCanvas = true;
    drawPointerId = e.pointerId;
    isPointerOutsideCanvas = false;

    if (canvas.setPointerCapture) {
        try {
            canvas.setPointerCapture(e.pointerId);
        } catch (error) {
            // ignore capture failures
        }
    }

    if (currentTool === "eyedropper") {
        useEyedropper(pos.x, pos.y);
        return;
    }

    if (currentTool === "line") {
        if (e.button !== 0) return;

        if (!lineAnchor) {
            lineAnchor = pos;
            lineStartPoint = pos;
            lineHasCommittedSegment = false;
            refreshWorkspacePreview();
            return;
        }

        if (samePixel(pos, lineAnchor)) {
            refreshWorkspacePreview();
            return;
        }

        if (lineStartPoint && samePixel(pos, lineStartPoint) && !samePixel(lineAnchor, lineStartPoint)) {
            commitLineSegment(lineAnchor, lineStartPoint);
            finishLinePath();
            return;
        }

        commitLineSegment(lineAnchor, pos);
        lineAnchor = pos;
        refreshWorkspacePreview();
        return;
    }

    if (currentTool === "rect" || currentTool === "ellipse") {
        if (e.button !== 0) return;

        clearSelection();
        clearLinePath();
        rectDrawing = true;
        rectStart = pos;
        rectEnd = pos;
        refreshWorkspacePreview();
        return;
    }

    if (currentTool === "select") {
        drawing = false;
        lastPixel = null;
        ditherOrigin = null;

        if (selectionPixels.length > 0 && insideSelection(pos)) {
            movingSelection = true;
            selectionMoveStateSaved = false;
            selectionOffset.x = pos.x - selectionStart.x;
            selectionOffset.y = pos.y - selectionStart.y;

            detachFloatingSelectionToMove();
            refreshWorkspacePreview();
            return;
        }

        if (selectionPixels.length > 0 && !insideSelection(pos)) {
            commitFloatingSelection();
            clearSelection();
            updateFrameUI();
            updateHistoryUI();
        }

        selecting = true;
        selectionStart = pos;
        selectionEnd = pos;
        refreshWorkspacePreview();
        return;
    }

    if (currentTool === "pencil" || currentTool === "eraser") {
        if (e.button !== 0) return;

        beginStrokeHistoryCapture();
        drawing = true;
        lastPixel = pos;
        ditherOrigin = { x: pos.x, y: pos.y };

        if (brushType === CUSTOM_BRUSH_TYPE && shouldQueueCustomBrushStamps()) {
            let changed = stampCustomBrushAt(pos.x, pos.y, GRID_SIZE >= 256);

            if (mirrorMode) {
                const mirrorX = GRID_SIZE - 1 - pos.x;
                if (stampCustomBrushAt(mirrorX, pos.y, GRID_SIZE >= 256)) {
                    changed = true;
                }
            }

            updateHistoryUI();

            if (changed) {
                if (GRID_SIZE >= 256) {
                    const cacheCtx = getCurrentFrameDisplayCacheContext();

                    if (cacheCtx) {
                        const fillState = { lastFillStyle: null };
                        patchCustomStampToDisplayCacheContext(cacheCtx, pos.x, pos.y, fillState);

                        if (mirrorMode) {
                            const mirrorX = GRID_SIZE - 1 - pos.x;
                            if (mirrorX !== pos.x) {
                                patchCustomStampToDisplayCacheContext(cacheCtx, mirrorX, pos.y, fillState);
                            }
                        }
                    }

                    markLayerRangeCacheDirtyDeferred();
                } else {
                    markCurrentFrameRenderCacheDirty();
                }

                forceImmediateCanvasRefresh();
            } else {
                queuePreviewOverlayRefresh();
            }

            return;
        }

        drawPixel(pos.x, pos.y);
        updateHistoryUI();

        if (shouldQueueCustomBrushStamps()) {
            queueCustomStampFlush();
        } else if (
            GRID_SIZE >= 512 &&
            brushType !== CUSTOM_BRUSH_TYPE &&
            (currentTool === "pencil" || currentTool === "eraser")
        ) {
            queueActiveStrokeRefresh();
        } else {
            forceImmediateCanvasRefresh();
        }

        return;
    }

    if (currentTool === "fill") {
        if (e.button !== 0) return;
        ditherOrigin = null;
        floodFill(pos.x, pos.y);
    }
});

canvas.addEventListener("dblclick", (e) => {
    if (isPlaying) return;
    if (currentTool !== "line") return;
    if (!lineAnchor) return;

    const pos = getMousePosition(e);

    if (!samePixel(pos, lineAnchor)) {
        commitLineSegment(lineAnchor, pos);
    }

    finishLinePath();
});

window.addEventListener("pointermove", (e) => {
    if (isPlaying) return;

    const coalescedEvents =
        typeof e.getCoalescedEvents === "function"
            ? e.getCoalescedEvents()
            : null;

    const moveEvents = coalescedEvents && coalescedEvents.length ? coalescedEvents : [e];
    const lastMoveEvent = moveEvents[moveEvents.length - 1];
    const pos = clampPixelPosition(getMousePositionFromClient(lastMoveEvent.clientX, lastMoveEvent.clientY));
    const hoverChanged = !hoverPixel || hoverPixel.x !== pos.x || hoverPixel.y !== pos.y;

    if (hoverChanged) {
        hoverPixel = pos;
    }

    let pointerOutsideChanged = false;

    if (drawPointerId !== null && e.pointerId === drawPointerId) {
        const rect = canvas.getBoundingClientRect();
        const outside =
            lastMoveEvent.clientX < rect.left ||
            lastMoveEvent.clientX > rect.right ||
            lastMoveEvent.clientY < rect.top ||
            lastMoveEvent.clientY > rect.bottom;

        pointerOutsideChanged = isPointerOutsideCanvas !== outside;
        isPointerOutsideCanvas = outside;
    }

    if (selecting) {
        selectionEnd = pos;
        forceImmediateCanvasRefresh();
        return;
    }

    if (movingSelection) {
        selectionStart = {
            x: pos.x - selectionOffset.x,
            y: pos.y - selectionOffset.y
        };

        selectionEnd = {
            x: selectionStart.x + selectionWidth - 1,
            y: selectionStart.y + selectionHeight - 1
        };

        forceImmediateCanvasRefresh();
        return;
    }

    if (rectDrawing) {
        rectEnd = pos;
        forceImmediateCanvasRefresh();
        return;
    }

    if (drawing && pointerDownOnCanvas && e.pointerId === drawPointerId) {
        for (let i = 0; i < moveEvents.length; i++) {
            const movePos = clampPixelPosition(
                getMousePositionFromClient(moveEvents[i].clientX, moveEvents[i].clientY)
            );
            continueDrawingToPosition(movePos);
        }
        return;
    }

    if (!drawing && (hoverChanged || pointerOutsideChanged)) {
        queuePreviewOverlayRefresh();
    }
});

window.addEventListener("pointerup", (e) => {
    if (drawPointerId !== null && e.pointerId !== drawPointerId) return;
    if (isPlaying) {
        resetPointerStrokeState();
        return;
    }

    let handledOwnRefresh = false;

    if (selecting) {
        selecting = false;
        captureSelection();
        handledOwnRefresh = true;
    } else if (movingSelection) {
        movingSelection = false;
        applySelection();
        handledOwnRefresh = true;
    } else if (rectDrawing) {
        rectDrawing = false;
        if (rectStart && rectEnd) {
            if (currentTool === "ellipse") {
                commitEllipse(rectStart, rectEnd);
            } else {
                commitRectangle(rectStart, rectEnd);
            }
        }
        clearRectState();
        handledOwnRefresh = true;
    } else if (currentTool === "line" && lineAnchor && lineStartPoint && hoverPixel) {
        commitLineSegment(lineAnchor, hoverPixel);
        handledOwnRefresh = true;
    }

    drawing = false;
    lastPixel = null;
    ditherOrigin = null;
    isPointerOutsideCanvas = false;

    if (activeStrokeRefreshTimer !== null) {
        clearTimeout(activeStrokeRefreshTimer);
        activeStrokeRefreshTimer = null;
    }

    activeStrokeRefreshQueued = false;
    activeStrokeRefreshPending = false;

    if (canvas.releasePointerCapture && drawPointerId !== null) {
        try {
            canvas.releasePointerCapture(drawPointerId);
        } catch (error) {
            // ignore release failures
        }
    }

    resetPointerStrokeState();
    flushPendingCustomStamps(false);

    if (!handledOwnRefresh) {
        queueWorkspacePreviewRefresh();
        queuePreviewOverlayRefresh();
    } else {
        queueWorkspacePreviewRefresh();
        queuePreviewOverlayRefresh();
    }
});

window.addEventListener("pointercancel", () => {
    if (isPlaying) {
        resetPointerStrokeState();
        return;
    }

    if (selecting) {
        selecting = false;
        captureSelection();
    }

    if (movingSelection) {
        movingSelection = false;
        applySelection();
    }

    if (rectDrawing) {
        clearRectState();
    }

    drawing = false;
    lastPixel = null;
    ditherOrigin = null;
    hoverPixel = null;
    isPointerOutsideCanvas = false;

    if (activeStrokeRefreshTimer !== null) {
        clearTimeout(activeStrokeRefreshTimer);
        activeStrokeRefreshTimer = null;
    }

    activeStrokeRefreshQueued = false;
    activeStrokeRefreshPending = false;

    resetPointerStrokeState();
    flushPendingCustomStamps(false);
    forceImmediateCanvasRefresh();
});

canvas.addEventListener("mouseleave", () => {
    if (isPlaying) return;

    if (!drawing && !selecting && !movingSelection && !rectDrawing) {
        hoverPixel = null;
        forceImmediatePreviewRefresh();
    }
});

if (frameTimeline) {
    frameTimeline.addEventListener("dragstart", (event) => {
        const item = event.target.closest(".frameThumb");
        if (!item || !framesUnlocked || isPlaying) {
            event.preventDefault();
            return;
        }

        const index = parseInt(item.dataset.frameIndex, 10);
        if (Number.isNaN(index)) {
            event.preventDefault();
            return;
        }

        dragFrameIndex = index;
        dragOverFrameIndex = index;
        dragStartedInWindow = true;
        frameMoveSelectionIndex = index;

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", String(index));
        }

        applyFrameDragVisuals();
        updateFrameMoveUI();
    });

    frameTimeline.addEventListener("dragover", (event) => {
        if (!framesUnlocked || dragFrameIndex === null) return;

        const item = event.target.closest(".frameThumb");
        if (!item) return;

        event.preventDefault();

        const index = parseInt(item.dataset.frameIndex, 10);
        if (Number.isNaN(index)) return;

        dragOverFrameIndex = index;

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }

        applyFrameDragVisuals();
    });

    frameTimeline.addEventListener("drop", (event) => {
        if (!framesUnlocked || dragFrameIndex === null) return;

        const item = event.target.closest(".frameThumb");
        if (!item) return;

        event.preventDefault();

        const toIndex = parseInt(item.dataset.frameIndex, 10);
        const fromIndex = dragFrameIndex;

        if (Number.isNaN(toIndex)) {
            clearFrameDragState();
            return;
        }

        clearFrameDragState();
        reorderFrames(fromIndex, toIndex, true);
        updateFrameMoveUI();
    });

    frameTimeline.addEventListener("dragend", () => {
        clearFrameDragState();
        setTimeout(() => {
            dragStartedInWindow = false;
        }, 0);
    });

    frameTimeline.addEventListener("dragleave", (event) => {
        const related = event.relatedTarget;
        if (related && frameTimeline.contains(related)) return;

        if (dragFrameIndex !== null) {
            dragOverFrameIndex = null;
            applyFrameDragVisuals();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
    }

    if (
        (e.ctrlKey && e.key.toLowerCase() === "y") ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "z")
    ) {
        e.preventDefault();
        redo();
        return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        exportProjectFile();
        return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        if (!isPlaying && loadProjectButton && loadProjectInput) {
            openFoldoutForElement(loadProjectButton);
            loadProjectInput.value = "";
            loadProjectInput.click();
        }
        return;
    }

    if (isPlaying) {
        if (e.code === "Space") {
            e.preventDefault();
            stopPlayback(true);
        }
        return;
    }

    if (e.target && (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "SELECT" ||
        e.target.tagName === "TEXTAREA"
    )) {
        return;
    }

    if (e.key === "Escape") {
        if (currentTool === "line" && lineAnchor) {
            clearLinePath();
            refreshWorkspacePreview();
            return;
        }

        if (currentTool === "select" && selectionPixels.length > 0) {
            commitFloatingSelection();
            clearSelection();
            updateFrameUI();
            updateHistoryUI();
            refreshWorkspacePreview();
            return;
        }

        if ((currentTool === "rect" || currentTool === "ellipse") && rectDrawing) {
            clearRectState();
            refreshWorkspacePreview();
            return;
        }
    }

    if (e.key === "Enter") {
        if (currentTool === "line" && lineAnchor) {
            finishLinePath();
            return;
        }

        if (currentTool === "select" && selectionPixels.length > 0) {
            commitFloatingSelection();
            clearSelection();
            updateFrameUI();
            updateHistoryUI();
            refreshWorkspacePreview();
            return;
        }

        if ((currentTool === "rect" || currentTool === "ellipse") && rectDrawing && rectStart && rectEnd) {
            rectDrawing = false;
            if (currentTool === "ellipse") {
                commitEllipse(rectStart, rectEnd);
            } else {
                commitRectangle(rectStart, rectEnd);
            }
            clearRectState();
            return;
        }
    }

    if (currentTool === "select" && selectionPixels.length > 0) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudgeFloatingSelection(-1, 0);
            return;
        }

        if (e.key === "ArrowRight") {
            e.preventDefault();
            nudgeFloatingSelection(1, 0);
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            nudgeFloatingSelection(0, -1);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            nudgeFloatingSelection(0, 1);
            return;
        }
    }

    if (e.key.toLowerCase() === "i") {
        setTool("eyedropper");
        return;
    }

    if (e.key.toLowerCase() === "p") {
        setTool("pencil");
        return;
    }

    if (e.key.toLowerCase() === "n") {
        if (currentTool === "line") {
            clearLinePath();
            setTool("pencil");
        } else {
            setTool("line");
        }
        return;
    }

    if (e.key.toLowerCase() === "r") {
        setTool("rect");
        return;
    }

    if (e.key.toLowerCase() === "c") {
        setTool("ellipse");
        return;
    }

    if (e.key.toLowerCase() === "o") {
        if (frames.length <= 1) return;
        onionSkinEnabled = !onionSkinEnabled;
        updateOnionSkinUI();
        refreshWorkspacePreview();
        return;
    }

    if (e.key.toLowerCase() === "v") {
        generateVariant();
        return;
    }

    if (e.key.toLowerCase() === "b") {
        rerollVariant();
        return;
    }

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleFrameArrowControl(-1);
        return;
    }

    if (e.key === "ArrowRight") {
        e.preventDefault();
        handleFrameArrowControl(1);
        return;
    }

    if (e.code === "BracketLeft") {
        e.preventDefault();
        if (currentWorkspaceMode === "frames" && workspacePanelExpanded && frames.length > 1) {
            shiftTimelineWindow(-1);
        }
        return;
    }

    if (e.code === "BracketRight") {
        e.preventDefault();
        if (currentWorkspaceMode === "frames" && workspacePanelExpanded && frames.length > 1) {
            shiftTimelineWindow(1);
        }
        return;
    }

    if (e.code === "Space") {
        e.preventDefault();
        startPlayback();
    }
});

function initializeApp() {
    if (appInitialized) return;
    appInitialized = true;

    ensureEditPanelExists();
    ensureAdvancedLayerControlsExists();
    ensureShapeToolControlsExist();
    ensureFlipControlsExist();
    ensureNoiseControlsExist();
    ensureVariantNoiseControlsExist();

    frames = [createFrameDataFromLayerTemplate()];
    currentFrameIndex = 0;
    currentLayerIndex = 0;
    timelineStartIndex = 0;
    framesUnlocked = false;
    workspacePanelExpanded = false;
    colorPanelVisible = true;
    multiLayerModeEnabled = false;
    advancedLayerControlsExpanded = false;
    playbackMode = "loop";
    playbackDirection = 1;
    playbackTimelineFrozenIndex = 0;
    rectMode = "outline";
    noiseEnabled = false;
    noiseStrength = 28;
    noiseDensity = 72;
    variantIncludeNoise = false;
    layerOpacityInteractionSaved = false;
    resetPointerStrokeState();
    syncFrameMoveSelectionToCurrentFrame();
    clearCurrentFrameRenderCache();

    applyCanvasZoom();
    applyPaletteLayout();
    loadSavedPalette();
    setCurrentColor(currentColor, { skipRecent: true });

    if (playbackModeSelect) {
        playbackModeSelect.value = "loop";
    }

    if (variantModeSelect) {
        variantModeSelect.value = "safe";
    }

    if (canvasSizeSelector) {
        canvasSizeSelector.value = String(GRID_SIZE);
    }

    if (rectModeSelect) {
        rectModeSelect.value = "outline";
    }

    updateToolUI();
    updateBrushUI();
    updateZoomLabel();
    updateFrameReorderUI();
    updateFrameUI();
    updatePlaybackUI();
    updateOnionSkinUI();
    updateWorkspaceModeUI();
    updateColorPanelUI();
    updateHistoryUI();
    updateFrameMoveUI();
    updateLayerUI();
    updateFrameDurationUI();
    updateVariantUI();
    updateAdvancedLayerUI();
    updateNoiseUI();
    updateVariantNoiseUI();
    syncFoldoutUI();

    if (gridButton) {
        gridButton.classList.add("activeTool");
    }

    if (stopAnimationButton) {
        stopAnimationButton.classList.add("activeTool");
    }

    setFoldoutOpen(toolsFoldout, true);
    setFoldoutOpen(brushViewFoldout, true);
    setFoldoutOpen(framesPlaybackFoldout, false);
    setFoldoutOpen(importExportFoldout, false);
    setFoldoutOpen(animationWorkspaceFoldout, true);
    setFoldoutOpen(colorFoldout, true);
    setFoldoutOpen(documentFoldout, false);

    refreshPaletteUI();
    refreshWorkspacePreview();

    window.addEventListener("resize", handleCanvasContainerResize);

    requestAnimationFrame(() => {
        ensureEditPanelExists();
        ensureAdvancedLayerControlsExists();
        ensureShapeToolControlsExist();
        ensureFlipControlsExist();
        ensureNoiseControlsExist();
        ensureVariantNoiseControlsExist();
        refreshPaletteUI();
        updateColorPanelUI();
        updateHistoryUI();
        updateFrameMoveUI();
        updateLayerUI();
        updateFrameDurationUI();
        updateVariantUI();
        updateAdvancedLayerUI();
        updateNoiseUI();
        updateVariantNoiseUI();
        updateEditPanelVisibility();
        syncFoldoutUI();
        centerCanvasViewport();
        refreshWorkspacePreview();
    });
}

function forcePaletteRefreshAfterModuleLoad() {
    ensureEditPanelExists();
    ensureAdvancedLayerControlsExists();
    ensureShapeToolControlsExist();
    ensureFlipControlsExist();
    ensureNoiseControlsExist();
    ensureVariantNoiseControlsExist();
    applyPaletteLayout();
    setCurrentColor(currentColor, { skipRecent: true });
    refreshPaletteUI();
    updateColorPanelUI();
    updateHistoryUI();
    updateFrameMoveUI();
    updateLayerUI();
    updateFrameDurationUI();
    updateVariantUI();
    updateAdvancedLayerUI();
    updateNoiseUI();
    updateVariantNoiseUI();
    updateEditPanelVisibility();
    syncFoldoutUI();
    refreshWorkspacePreview();
}

syncPaletteBridge();
window.PixelForgeInitializeApp = initializeApp;
window.PixelForgeForcePaletteRefresh = forcePaletteRefreshAfterModuleLoad;
setTimeout(initializeApp, 0);