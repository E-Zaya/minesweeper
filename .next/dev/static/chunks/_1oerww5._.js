(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/minesweeper/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DIFFICULTY_CONFIG",
    ()=>DIFFICULTY_CONFIG
]);
const DIFFICULTY_CONFIG = {
    beginner: {
        rows: 5,
        cols: 5,
        mines: 4
    },
    intermediate: {
        rows: 6,
        cols: 6,
        mines: 7
    },
    expert: {
        rows: 8,
        cols: 8,
        mines: 13
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useMinesweeper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMinesweeper",
    ()=>useMinesweeper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function createEmptyBoard(rows, cols) {
    return Array.from({
        length: rows
    }, (_, r)=>Array.from({
            length: cols
        }, (_, c)=>({
                row: r,
                col: c,
                isMine: false,
                adjacentMines: 0,
                state: 'hidden'
            })));
}
function placeMines(board, mines, safeRow, safeCol) {
    const rows = board.length;
    const cols = board[0].length;
    const clone = board.map((row)=>row.map((cell)=>({
                ...cell
            })));
    // 3×3 safe zone around first click
    const safeSet = new Set();
    for(let dr = -1; dr <= 1; dr++){
        for(let dc = -1; dc <= 1; dc++){
            const nr = safeRow + dr;
            const nc = safeCol + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                safeSet.add(`${nr},${nc}`);
            }
        }
    }
    let placed = 0;
    const candidates = [];
    for(let r = 0; r < rows; r++)for(let c = 0; c < cols; c++)if (!safeSet.has(`${r},${c}`)) candidates.push([
        r,
        c
    ]);
    // Fisher-Yates partial shuffle
    for(let i = candidates.length - 1; i > 0 && placed < mines; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [
            candidates[j],
            candidates[i]
        ];
        const [r, c] = candidates[i];
        clone[r][c].isMine = true;
        placed++;
    }
    // Calculate adjacent mine counts
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if (clone[r][c].isMine) continue;
            let count = 0;
            for(let dr = -1; dr <= 1; dr++)for(let dc = -1; dc <= 1; dc++){
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && clone[nr][nc].isMine) count++;
            }
            clone[r][c].adjacentMines = count;
        }
    }
    return clone;
}
function bfsReveal(board, startRow, startCol) {
    const rows = board.length;
    const cols = board[0].length;
    const clone = board.map((row)=>row.map((cell)=>({
                ...cell
            })));
    const queue = [
        [
            startRow,
            startCol
        ]
    ];
    const visited = new Set();
    while(queue.length > 0){
        const [r, c] = queue.shift();
        const key = `${r},${c}`;
        if (visited.has(key)) continue;
        visited.add(key);
        const cell = clone[r][c];
        if (cell.state === 'flagged' || cell.state === 'questioned') continue;
        cell.state = 'revealed';
        if (cell.adjacentMines === 0 && !cell.isMine) {
            for(let dr = -1; dr <= 1; dr++)for(let dc = -1; dc <= 1; dc++){
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(`${nr},${nc}`) && clone[nr][nc].state === 'hidden') {
                    queue.push([
                        nr,
                        nc
                    ]);
                }
            }
        }
    }
    return clone;
}
function checkWin(board) {
    for (const row of board)for (const cell of row)if (!cell.isMine && cell.state !== 'revealed') return false;
    return true;
}
function countFlags(board) {
    let count = 0;
    for (const row of board)for (const cell of row)if (cell.state === 'flagged') count++;
    return count;
}
function makeInitialState(difficulty) {
    const { rows, cols, mines } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][difficulty];
    return {
        board: createEmptyBoard(rows, cols),
        status: 'idle',
        minesLeft: mines,
        startTime: null,
        elapsedTime: 0,
        firstClick: true,
        difficulty
    };
}
function useMinesweeper(difficulty) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useMinesweeper.useState": ()=>makeInitialState(difficulty)
    }["useMinesweeper.useState"]);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stopTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[stopTimer]": ()=>{
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }["useMinesweeper.useCallback[stopTimer]"], []);
    const startTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[startTimer]": ()=>{
            stopTimer();
            timerRef.current = setInterval({
                "useMinesweeper.useCallback[startTimer]": ()=>{
                    setState({
                        "useMinesweeper.useCallback[startTimer]": (prev)=>({
                                ...prev,
                                elapsedTime: prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : 0
                            })
                    }["useMinesweeper.useCallback[startTimer]"]);
                }
            }["useMinesweeper.useCallback[startTimer]"], 1000);
        }
    }["useMinesweeper.useCallback[startTimer]"], [
        stopTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMinesweeper.useEffect": ()=>{
            return ({
                "useMinesweeper.useEffect": ()=>stopTimer()
            })["useMinesweeper.useEffect"];
        }
    }["useMinesweeper.useEffect"], [
        stopTimer
    ]);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[reset]": (newDifficulty)=>{
            stopTimer();
            setState(makeInitialState(newDifficulty ?? difficulty));
        }
    }["useMinesweeper.useCallback[reset]"], [
        difficulty,
        stopTimer
    ]);
    const reveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[reveal]": (row, col)=>{
            setState({
                "useMinesweeper.useCallback[reveal]": (prev)=>{
                    if (prev.status === 'won' || prev.status === 'lost') return prev;
                    const cell = prev.board[row][col];
                    if (cell.state === 'revealed' || cell.state === 'flagged') return prev;
                    let board = prev.board;
                    let firstClick = prev.firstClick;
                    let startTime = prev.startTime;
                    let status = prev.status;
                    if (firstClick) {
                        board = placeMines(board, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][prev.difficulty].mines, row, col);
                        startTime = Date.now();
                        firstClick = false;
                        status = 'playing';
                    // start timer after state update via effect, handled below
                    }
                    if (board[row][col].state === 'questioned') {
                        // treat questioned as revealable
                        const clone = board.map({
                            "useMinesweeper.useCallback[reveal].clone": (r)=>r.map({
                                    "useMinesweeper.useCallback[reveal].clone": (c)=>({
                                            ...c
                                        })
                                }["useMinesweeper.useCallback[reveal].clone"])
                        }["useMinesweeper.useCallback[reveal].clone"]);
                        clone[row][col].state = 'hidden';
                        board = clone;
                    }
                    if (board[row][col].isMine) {
                        // Reveal all mines
                        const clone = board.map({
                            "useMinesweeper.useCallback[reveal].clone": (r)=>r.map({
                                    "useMinesweeper.useCallback[reveal].clone": (c)=>({
                                            ...c,
                                            state: c.isMine ? 'revealed' : c.state
                                        })
                                }["useMinesweeper.useCallback[reveal].clone"])
                        }["useMinesweeper.useCallback[reveal].clone"]);
                        return {
                            ...prev,
                            board: clone,
                            status: 'lost',
                            startTime,
                            firstClick,
                            elapsedTime: startTime ? Math.floor((Date.now() - startTime) / 1000) : prev.elapsedTime
                        };
                    }
                    const newBoard = bfsReveal(board, row, col);
                    const won = checkWin(newBoard);
                    const newStatus = won ? 'won' : status === 'idle' ? 'playing' : status;
                    const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : prev.elapsedTime;
                    return {
                        ...prev,
                        board: newBoard,
                        status: newStatus,
                        startTime,
                        firstClick,
                        elapsedTime: won ? elapsed : prev.elapsedTime,
                        minesLeft: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][prev.difficulty].mines - countFlags(newBoard)
                    };
                }
            }["useMinesweeper.useCallback[reveal]"]);
        }
    }["useMinesweeper.useCallback[reveal]"], []);
    // Effect to start/stop timer based on status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMinesweeper.useEffect": ()=>{
            if (state.status === 'playing' && state.startTime) {
                startTimer();
            } else if (state.status === 'won' || state.status === 'lost') {
                stopTimer();
            }
        }
    }["useMinesweeper.useEffect"], [
        state.status,
        state.startTime,
        startTimer,
        stopTimer
    ]);
    const toggleFlag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[toggleFlag]": (row, col)=>{
            setState({
                "useMinesweeper.useCallback[toggleFlag]": (prev)=>{
                    if (prev.status === 'won' || prev.status === 'lost') return prev;
                    const cell = prev.board[row][col];
                    if (cell.state === 'revealed') return prev;
                    const clone = prev.board.map({
                        "useMinesweeper.useCallback[toggleFlag].clone": (r)=>r.map({
                                "useMinesweeper.useCallback[toggleFlag].clone": (c)=>({
                                        ...c
                                    })
                            }["useMinesweeper.useCallback[toggleFlag].clone"])
                    }["useMinesweeper.useCallback[toggleFlag].clone"]);
                    const next = {
                        hidden: 'flagged',
                        flagged: 'questioned',
                        questioned: 'hidden',
                        revealed: 'revealed'
                    };
                    clone[row][col].state = next[cell.state];
                    const minesLeft = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][prev.difficulty].mines - countFlags(clone);
                    return {
                        ...prev,
                        board: clone,
                        minesLeft
                    };
                }
            }["useMinesweeper.useCallback[toggleFlag]"]);
        }
    }["useMinesweeper.useCallback[toggleFlag]"], []);
    // Chord: reveal all unflagged neighbors of a revealed numbered cell
    const chord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMinesweeper.useCallback[chord]": (row, col)=>{
            setState({
                "useMinesweeper.useCallback[chord]": (prev)=>{
                    if (prev.status === 'won' || prev.status === 'lost') return prev;
                    const cell = prev.board[row][col];
                    if (cell.state !== 'revealed' || cell.adjacentMines === 0) return prev;
                    const rows = prev.board.length;
                    const cols = prev.board[0].length;
                    const neighbors = [];
                    let flagCount = 0;
                    for(let dr = -1; dr <= 1; dr++)for(let dc = -1; dc <= 1; dc++){
                        if (dr === 0 && dc === 0) continue;
                        const nr = row + dr;
                        const nc = col + dc;
                        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                        const n = prev.board[nr][nc];
                        if (n.state === 'flagged') flagCount++;
                        else if (n.state === 'hidden' || n.state === 'questioned') neighbors.push([
                            nr,
                            nc
                        ]);
                    }
                    if (flagCount !== cell.adjacentMines) return prev;
                    // Reveal each neighbor — check for mine hit
                    let board = prev.board;
                    let hitMine = false;
                    for (const [nr, nc] of neighbors){
                        if (board[nr][nc].isMine) {
                            hitMine = true;
                            break;
                        }
                        board = bfsReveal(board, nr, nc);
                    }
                    if (hitMine) {
                        const clone = board.map({
                            "useMinesweeper.useCallback[chord].clone": (r)=>r.map({
                                    "useMinesweeper.useCallback[chord].clone": (c)=>({
                                            ...c,
                                            state: c.isMine ? 'revealed' : c.state
                                        })
                                }["useMinesweeper.useCallback[chord].clone"])
                        }["useMinesweeper.useCallback[chord].clone"]);
                        return {
                            ...prev,
                            board: clone,
                            status: 'lost'
                        };
                    }
                    const won = checkWin(board);
                    const elapsed = prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : prev.elapsedTime;
                    return {
                        ...prev,
                        board,
                        status: won ? 'won' : prev.status,
                        elapsedTime: won ? elapsed : prev.elapsedTime,
                        minesLeft: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][prev.difficulty].mines - countFlags(board)
                    };
                }
            }["useMinesweeper.useCallback[chord]"]);
        }
    }["useMinesweeper.useCallback[chord]"], []);
    return {
        state,
        reveal,
        toggleFlag,
        chord,
        reset
    };
}
_s(useMinesweeper, "i3PF29Vq7VJXunfQj/e4r+4SfCM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useLeaderboard.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLeaderboard",
    ()=>useLeaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const STORAGE_KEY = 'minesweeper_leaderboard';
const TOP_N = 20;
function loadScores() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch  {
        return [];
    }
}
function saveScores(scores) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch  {
    // storage full — silently ignore
    }
}
function useLeaderboard() {
    _s();
    const [scores, setScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLeaderboard.useState": ()=>loadScores()
    }["useLeaderboard.useState"]);
    const addScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLeaderboard.useCallback[addScore]": (entry)=>{
            const all = loadScores();
            const withNew = [
                ...all,
                entry
            ];
            const forDiff = withNew.filter({
                "useLeaderboard.useCallback[addScore].forDiff": (s)=>s.difficulty === entry.difficulty
            }["useLeaderboard.useCallback[addScore].forDiff"]).sort({
                "useLeaderboard.useCallback[addScore].forDiff": (a, b)=>a.time - b.time
            }["useLeaderboard.useCallback[addScore].forDiff"]).slice(0, TOP_N);
            const other = withNew.filter({
                "useLeaderboard.useCallback[addScore].other": (s)=>s.difficulty !== entry.difficulty
            }["useLeaderboard.useCallback[addScore].other"]);
            const merged = [
                ...other,
                ...forDiff
            ].sort({
                "useLeaderboard.useCallback[addScore].merged": (a, b)=>{
                    const diffOrder = [
                        'beginner',
                        'intermediate',
                        'expert'
                    ];
                    if (a.difficulty !== b.difficulty) return diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty);
                    return a.time - b.time;
                }
            }["useLeaderboard.useCallback[addScore].merged"]);
            saveScores(merged);
            setScores(merged);
            const rank = forDiff.findIndex({
                "useLeaderboard.useCallback[addScore].rank": (s)=>s.name === entry.name && s.time === entry.time && s.date === entry.date
            }["useLeaderboard.useCallback[addScore].rank"]);
            return rank + 1;
        }
    }["useLeaderboard.useCallback[addScore]"], []);
    const getByDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLeaderboard.useCallback[getByDifficulty]": (diff)=>scores.filter({
                "useLeaderboard.useCallback[getByDifficulty]": (s)=>s.difficulty === diff
            }["useLeaderboard.useCallback[getByDifficulty]"]).sort({
                "useLeaderboard.useCallback[getByDifficulty]": (a, b)=>a.time - b.time
            }["useLeaderboard.useCallback[getByDifficulty]"]).slice(0, TOP_N)
    }["useLeaderboard.useCallback[getByDifficulty]"], [
        scores
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLeaderboard.useCallback[refresh]": ()=>{
            setScores(loadScores());
        }
    }["useLeaderboard.useCallback[refresh]"], []);
    return {
        scores,
        addScore,
        getByDifficulty,
        refresh
    };
}
_s(useLeaderboard, "/Q3wlgxLCV+QKHpwvvHTNXse6Go=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useSound.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSound",
    ()=>useSound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useSound() {
    _s();
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const getCtx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSound.useCallback[getCtx]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!ctxRef.current) {
                ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            return ctxRef.current;
        }
    }["useSound.useCallback[getCtx]"], []);
    const play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSound.useCallback[play]": (type)=>{
            const ctx = getCtx();
            if (!ctx) return;
            const now = ctx.currentTime;
            switch(type){
                case 'reveal':
                    {
                        // Soft wood tap
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(420, now);
                        osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
                        gain.gain.setValueAtTime(0.18, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                        osc.start(now);
                        osc.stop(now + 0.09);
                        break;
                    }
                case 'click':
                    {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(320, now);
                        gain.gain.setValueAtTime(0.1, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                        osc.start(now);
                        osc.stop(now + 0.06);
                        break;
                    }
                case 'flag':
                    {
                        // Light bell ping
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'triangle';
                        osc.frequency.setValueAtTime(880, now);
                        osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
                        gain.gain.setValueAtTime(0.15, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                        osc.start(now);
                        osc.stop(now + 0.21);
                        break;
                    }
                case 'chord':
                    {
                        // Two quick reveal taps
                        for(let i = 0; i < 2; i++){
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.type = 'sine';
                            osc.frequency.setValueAtTime(380 + i * 40, now + i * 0.04);
                            gain.gain.setValueAtTime(0.12, now + i * 0.04);
                            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.07);
                            osc.start(now + i * 0.04);
                            osc.stop(now + i * 0.04 + 0.08);
                        }
                        break;
                    }
                case 'win':
                    {
                        // Rising pentatonic arpeggio — koto-like
                        const freqs = [
                            523,
                            659,
                            784,
                            1047,
                            1319
                        ];
                        freqs.forEach({
                            "useSound.useCallback[play]": (freq, i)=>{
                                const osc = ctx.createOscillator();
                                const gain = ctx.createGain();
                                osc.connect(gain);
                                gain.connect(ctx.destination);
                                osc.type = 'triangle';
                                osc.frequency.setValueAtTime(freq, now + i * 0.1);
                                gain.gain.setValueAtTime(0.2, now + i * 0.1);
                                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
                                osc.start(now + i * 0.1);
                                osc.stop(now + i * 0.1 + 0.51);
                            }
                        }["useSound.useCallback[play]"]);
                        break;
                    }
                case 'lose':
                    {
                        // Muffled descending thud
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        const filter = ctx.createBiquadFilter();
                        osc.connect(filter);
                        filter.connect(gain);
                        gain.connect(ctx.destination);
                        osc.type = 'sawtooth';
                        filter.type = 'lowpass';
                        filter.frequency.setValueAtTime(400, now);
                        filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);
                        osc.frequency.setValueAtTime(180, now);
                        osc.frequency.exponentialRampToValueAtTime(55, now + 0.5);
                        gain.gain.setValueAtTime(0.3, now);
                        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
                        osc.start(now);
                        osc.stop(now + 0.56);
                        break;
                    }
            }
        }
    }["useSound.useCallback[play]"], [
        getCtx
    ]);
    return {
        play
    };
}
_s(useSound, "KcIBkWrvck8mDuVkYOkG4kRRFm8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>t,
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        enterName: 'Enter your name',
        start: 'Start',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        expert: 'Expert',
        mines: 'Mines',
        time: 'Time',
        youWin: 'You Win!',
        gameOver: 'Game Over',
        saveScore: 'Save Score',
        leaderboard: 'Leaderboard',
        retry: 'Retry',
        rank: 'Rank',
        name: 'Name',
        date: 'Date',
        longPressToFlag: 'Long press to flag',
        selectDifficulty: 'Select Difficulty',
        noScores: 'No scores yet',
        yourTime: 'Your Time',
        chordHint: 'Double-tap number to chord',
        difficultyLabel: 'Difficulty',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        mineLabel: '初 中 級',
        placeholderName: 'Player',
        seconds: 's',
        back: 'Back',
        close: 'Close',
        share: 'Share',
        copyLink: 'Copy result',
        copied: 'Copied!',
        viewBoard: 'View board',
        showResult: 'Show result',
        backToDifficulty: 'Change difficulty',
        newBest: 'New Best!',
        yourRank: 'Your rank',
        cleared: 'cleared',
        in: 'in',
        challenge: 'Can you beat me?',
        howToPlay: 'How to Play',
        rules: 'Rules',
        revealMode: 'Reveal Mode',
        flagMode: 'Flag Mode',
        rule1: 'Tap a cell to reveal it. The number shows nearby mines.',
        rule2: 'Switch to FLAG mode to mark suspected mines (mobile). On desktop, right-click to flag.',
        rule3: 'Tap a revealed number with enough flags around it to auto-reveal neighbors (chord).',
        rule4: 'Clear all safe cells to win. Hit a mine and you lose.',
        rule5: 'Your first tap is always safe — mines are placed after.',
        tips: 'Tips',
        tip1: 'Long-press a cell to flag (mobile).',
        tip2: 'Right-click cycles: flag → question → clear.',
        got_it: 'Got it!'
    },
    jp: {
        enterName: '名前を入力',
        start: 'はじめる',
        beginner: '初級',
        intermediate: '中級',
        expert: '上級',
        mines: '地雷',
        time: 'タイム',
        youWin: 'クリア！',
        gameOver: 'ゲームオーバー',
        saveScore: 'スコアを保存',
        leaderboard: 'ランキング',
        retry: 'もう一度',
        rank: '順位',
        name: '名前',
        date: '日付',
        longPressToFlag: '長押しで旗',
        selectDifficulty: '難易度を選択',
        noScores: 'スコアなし',
        yourTime: 'タイム',
        chordHint: '数字をダブルタップでチョード',
        difficultyLabel: '難易度',
        language: '言語',
        theme: 'テーマ',
        light: 'ライト',
        dark: 'ダーク',
        mineLabel: '初 中 級',
        placeholderName: 'プレイヤー',
        seconds: '秒',
        back: '戻る',
        close: '閉じる',
        share: 'シェア',
        copyLink: '結果をコピー',
        copied: 'コピーしました！',
        viewBoard: '盤面を見る',
        showResult: '結果を見る',
        backToDifficulty: '難易度を変更',
        newBest: '自己ベスト！',
        yourRank: 'あなたの順位',
        cleared: 'クリア',
        in: '·',
        challenge: '挑戦してみる？',
        howToPlay: '遊び方',
        rules: 'ルール',
        revealMode: '開くモード',
        flagMode: '旗モード',
        rule1: 'マスをタップして開く。数字は周囲の地雷の数。',
        rule2: 'モバイルでは「旗モード」に切替えて地雷の場所に旗を立てる。PCでは右クリックで旗。',
        rule3: '数字の周りに正しく旗を立てた状態でタップすると、周囲を一気に開ける（チョード）。',
        rule4: '地雷以外をすべて開けば勝利。地雷を踏んだら負け。',
        rule5: '最初のタップは必ず安全。地雷はその後に配置される。',
        tips: 'ヒント',
        tip1: 'マスを長押しでも旗を立てられる（モバイル）。',
        tip2: '右クリックで 旗 → ？ → 戻る を切替。',
        got_it: 'わかった！'
    }
};
function t(lang, key) {
    return translations[lang][key];
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/NameEntry.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NameEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NameEntry({ onStart }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    // Apply theme immediately so the user sees the toggle take effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NameEntry.useEffect": ()=>{
            const html = document.documentElement;
            if (theme === 'dark') html.classList.add('dark');
            else html.classList.remove('dark');
        }
    }["NameEntry.useEffect"], [
        theme
    ]);
    const handleStart = ()=>{
        const trimmed = name.trim() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'placeholderName');
        onStart(trimmed, lang, theme);
    };
    const handleKey = (e)=>{
        if (e.key === 'Enter') handleStart();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "neu-card p-8 rounded-2xl w-full max-w-sm flex flex-col gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-serif text-4xl tracking-widest mb-1 text-stone-800 dark:text-washi-100",
                            children: "地雷"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-sm tracking-[0.3em] text-stone-500 dark:text-stone-400 uppercase",
                            children: "Minesweeper"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "font-serif text-sm text-stone-600 dark:text-washi-200 tracking-wide",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'enterName')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: name,
                            onChange: (e)=>setName(e.target.value),
                            onKeyDown: handleKey,
                            placeholder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'placeholderName'),
                            maxLength: 20,
                            className: "neu-input px-4 py-3 rounded-xl font-serif text-base outline-none w-full text-stone-800 dark:text-washi-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-xs text-stone-600 dark:text-washi-200 tracking-wide",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'language')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "neu-toggle-group flex rounded-lg overflow-hidden p-1 gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setLang('en'),
                                            className: `flex-1 py-1.5 text-sm font-mono rounded-md transition-all duration-200 ${lang === 'en' ? 'neu-toggle-active' : 'neu-toggle-inactive'}`,
                                            children: "EN"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setLang('jp'),
                                            className: `flex-1 py-1.5 text-sm font-serif rounded-md transition-all duration-200 ${lang === 'jp' ? 'neu-toggle-active' : 'neu-toggle-inactive'}`,
                                            children: "JP"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-xs text-stone-600 dark:text-washi-200 tracking-wide",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'theme')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "neu-toggle-group flex rounded-lg overflow-hidden p-1 gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTheme('light'),
                                            className: `flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${theme === 'light' ? 'neu-toggle-active' : 'neu-toggle-inactive'}`,
                                            "aria-label": "Light mode",
                                            children: "☀"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTheme('dark'),
                                            className: `flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${theme === 'dark' ? 'neu-toggle-active' : 'neu-toggle-inactive'}`,
                                            "aria-label": "Dark mode",
                                            children: "☽"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/NameEntry.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleStart,
                    className: "neu-btn-primary py-3 px-6 rounded-xl font-serif text-lg tracking-widest transition-all duration-200 active:scale-95",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, 'start')
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/NameEntry.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/minesweeper/NameEntry.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/NameEntry.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(NameEntry, "3GWa6aZQa0E4etpWmV+aFq4pQSo=");
_c = NameEntry;
var _c;
__turbopack_context__.k.register(_c, "NameEntry");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/DifficultySelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DifficultySelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
'use client';
;
;
;
const DIFFICULTIES = [
    {
        key: 'beginner',
        jp: '初級',
        kanji: '初'
    },
    {
        key: 'intermediate',
        jp: '中級',
        kanji: '中'
    },
    {
        key: 'expert',
        jp: '上級',
        kanji: '上'
    }
];
function DifficultySelect({ language, onSelect, onLeaderboard, onBack }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm flex flex-col gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-serif text-2xl tracking-widest text-app-strong",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'selectDifficulty')
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: DIFFICULTIES.map(({ key, jp, kanji })=>{
                        const cfg = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][key];
                        const label = language === 'jp' ? jp : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, key);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelect(key),
                            className: "neu-btn-raised px-5 py-4 rounded-xl text-left transition-all duration-200 active:scale-95 flex items-center gap-4 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "neu-inset w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif text-2xl text-matcha",
                                        children: kanji
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                                        lineNumber: 42,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-lg text-app group-hover:text-matcha transition-colors",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                                            lineNumber: 45,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xs text-muted",
                                            children: [
                                                cfg.rows,
                                                "×",
                                                cfg.cols,
                                                " · ",
                                                cfg.mines,
                                                " ",
                                                language === 'jp' ? '地雷' : 'mines'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, key, true, {
                            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                            lineNumber: 35,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onBack,
                            className: "neu-btn-raised flex-1 py-2 px-3 rounded-lg font-serif text-sm text-soft transition-all duration-200 active:scale-95",
                            children: [
                                "← ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'back')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onLeaderboard,
                            className: "neu-btn-raised flex-1 py-2 px-3 rounded-lg font-serif text-sm text-soft transition-all duration-200 active:scale-95",
                            children: [
                                "🏆 ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/DifficultySelect.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = DifficultySelect;
var _c;
__turbopack_context__.k.register(_c, "DifficultySelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/Cell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const NUMBER_COLORS = {
    1: 'text-blue-700 dark:text-blue-300',
    2: 'text-emerald-700 dark:text-emerald-300',
    3: 'text-red-700 dark:text-red-300',
    4: 'text-purple-700 dark:text-purple-300',
    5: 'text-amber-800 dark:text-amber-300',
    6: 'text-teal-700 dark:text-teal-300',
    7: 'text-stone-900 dark:text-stone-100',
    8: 'text-stone-700 dark:text-stone-300'
};
function Cell({ cell, cellSize, flagMode, onReveal, onFlag, onChord, gameOver }) {
    _s();
    const longPressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const touchMovedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const handleContextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Cell.useCallback[handleContextMenu]": (e)=>{
            e.preventDefault();
            if (!gameOver) onFlag(cell.row, cell.col);
        }
    }["Cell.useCallback[handleContextMenu]"], [
        cell.row,
        cell.col,
        onFlag,
        gameOver
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Cell.useCallback[handleClick]": (e)=>{
            if (e.button !== 0) return;
            if (cell.state === 'revealed') {
                onChord(cell.row, cell.col);
                return;
            }
            if (gameOver) return;
            if (flagMode) onFlag(cell.row, cell.col);
            else onReveal(cell.row, cell.col);
        }
    }["Cell.useCallback[handleClick]"], [
        cell.row,
        cell.col,
        cell.state,
        onReveal,
        onFlag,
        onChord,
        gameOver,
        flagMode
    ]);
    // Touch: long press = flag, double-tap = chord
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Cell.useCallback[handleTouchStart]": (e)=>{
            touchMovedRef.current = false;
            const now = Date.now();
            const timeSinceLast = now - lastTapRef.current;
            if (cell.state === 'revealed' && timeSinceLast < 350) {
                // double tap on revealed = chord
                e.preventDefault();
                onChord(cell.row, cell.col);
                lastTapRef.current = 0;
                return;
            }
            lastTapRef.current = now;
            if (cell.state !== 'revealed') {
                longPressRef.current = setTimeout({
                    "Cell.useCallback[handleTouchStart]": ()=>{
                        if (!touchMovedRef.current && !gameOver) {
                            e.preventDefault();
                            onFlag(cell.row, cell.col);
                        }
                    }
                }["Cell.useCallback[handleTouchStart]"], 500);
            }
        }
    }["Cell.useCallback[handleTouchStart]"], [
        cell.row,
        cell.col,
        cell.state,
        onFlag,
        onChord,
        gameOver
    ]);
    const handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Cell.useCallback[handleTouchMove]": ()=>{
            touchMovedRef.current = true;
            if (longPressRef.current) {
                clearTimeout(longPressRef.current);
                longPressRef.current = null;
            }
        }
    }["Cell.useCallback[handleTouchMove]"], []);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Cell.useCallback[handleTouchEnd]": (e)=>{
            if (longPressRef.current) {
                clearTimeout(longPressRef.current);
                longPressRef.current = null;
                if (!touchMovedRef.current && cell.state !== 'revealed' && !gameOver) {
                    e.preventDefault();
                    if (flagMode) onFlag(cell.row, cell.col);
                    else onReveal(cell.row, cell.col);
                }
            }
        }
    }["Cell.useCallback[handleTouchEnd]"], [
        cell.row,
        cell.col,
        cell.state,
        onReveal,
        onFlag,
        gameOver,
        flagMode
    ]);
    const size = `${cellSize}px`;
    if (cell.state === 'revealed') {
        if (cell.isMine) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: size,
                    height: size,
                    minWidth: size,
                    minHeight: size
                },
                className: "neu-cell-mine flex items-center justify-center rounded-md select-none text-lg",
                onClick: handleClick,
                children: "💣"
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Cell.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: size,
                height: size,
                minWidth: size,
                minHeight: size,
                fontSize: `${Math.max(12, cellSize * 0.48)}px`
            },
            className: `neu-cell-revealed flex items-center justify-center rounded-md select-none font-mono font-bold
          ${cell.adjacentMines > 0 ? NUMBER_COLORS[cell.adjacentMines] : ''}`,
            onClick: handleClick,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            children: cell.adjacentMines > 0 ? cell.adjacentMines : ''
        }, void 0, false, {
            fileName: "[project]/components/minesweeper/Cell.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this);
    }
    if (cell.state === 'flagged') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: size,
                height: size,
                minWidth: size,
                minHeight: size
            },
            className: "neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer transition-all duration-150 active:scale-95 text-lg",
            onClick: handleContextMenu,
            onContextMenu: handleContextMenu,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            children: "🚩"
        }, void 0, false, {
            fileName: "[project]/components/minesweeper/Cell.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, this);
    }
    if (cell.state === 'questioned') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: size,
                height: size,
                minWidth: size,
                minHeight: size
            },
            className: "neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer transition-all duration-150 active:scale-95 text-lg",
            onClick: handleClick,
            onContextMenu: handleContextMenu,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-amber-500 dark:text-amber-400 font-bold font-mono",
                style: {
                    fontSize: `${Math.max(11, cellSize * 0.44)}px`
                },
                children: "？"
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Cell.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/minesweeper/Cell.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this);
    }
    // hidden
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: size,
            height: size,
            minWidth: size,
            minHeight: size
        },
        className: "neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer transition-all duration-100 active:scale-95 hover:brightness-105",
        onClick: handleClick,
        onContextMenu: handleContextMenu,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/Cell.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
_s(Cell, "omJMKv/HbjjX5ujLc//KsfyPJe4=");
_c = Cell;
var _c;
__turbopack_context__.k.register(_c, "Cell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/Board.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Board
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/Cell.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MIN_CELL = 36;
function Board({ board, difficulty, gameOver, flagMode, onReveal, onFlag, onChord }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cellSize, setCellSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MIN_CELL);
    const { cols } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_CONFIG"][difficulty];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Board.useEffect": ()=>{
            const update = {
                "Board.useEffect.update": ()=>{
                    if (!containerRef.current) return;
                    const w = containerRef.current.clientWidth;
                    const gap = 3;
                    const computed = Math.floor((w - gap * (cols - 1)) / cols);
                    setCellSize(Math.max(MIN_CELL, computed));
                }
            }["Board.useEffect.update"];
            update();
            const ro = new ResizeObserver(update);
            if (containerRef.current) ro.observe(containerRef.current);
            return ({
                "Board.useEffect": ()=>ro.disconnect()
            })["Board.useEffect"];
        }
    }["Board.useEffect"], [
        cols
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "retro-frame w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "screw-tl"
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Board.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "screw-br"
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Board.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "retro-label",
                children: "BOARD"
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Board.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "retro-screen w-full overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col",
                    style: {
                        gap: '3px',
                        width: 'fit-content',
                        margin: '0 auto'
                    },
                    children: board.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            style: {
                                gap: '3px'
                            },
                            children: row.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    cell: cell,
                                    cellSize: cellSize,
                                    flagMode: flagMode,
                                    onReveal: onReveal,
                                    onFlag: onFlag,
                                    onChord: onChord,
                                    gameOver: gameOver
                                }, `${cell.row}-${cell.col}`, false, {
                                    fileName: "[project]/components/minesweeper/Board.tsx",
                                    lineNumber: 52,
                                    columnNumber: 17
                                }, this))
                        }, row[0].row, false, {
                            fileName: "[project]/components/minesweeper/Board.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/Board.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Board.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/minesweeper/Board.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(Board, "yWLeCICCbq5O+jF9ftIMS2d/HvI=");
_c = Board;
var _c;
__turbopack_context__.k.register(_c, "Board");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
'use client';
;
;
function pad(n) {
    return String(Math.min(999, n)).padStart(3, '0');
}
const DIFF_KANJI = {
    beginner: '初',
    intermediate: '中',
    expert: '上'
};
function Header({ minesLeft, elapsedTime, language, difficulty, playerName, flagMode, gameOver, onReset, onLeaderboard, onHowToPlay, onBack, onFlagModeToggle }) {
    const diffLabel = language === 'jp' ? ({
        beginner: '初級',
        intermediate: '中級',
        expert: '上級'
    })[difficulty] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, difficulty);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "neu-header md:hidden w-full px-3 py-2.5 rounded-xl mb-3 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "neu-btn-icon w-9 h-9 rounded-lg text-soft text-sm transition-all duration-150 active:scale-90",
                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'back'),
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        children: "💣"
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-base text-red-600 dark:text-red-400 tabular-nums",
                                        children: pad(minesLeft)
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onReset,
                                className: "neu-btn-icon w-11 h-11 rounded-xl text-2xl transition-all duration-150 active:scale-90",
                                "aria-label": "Reset",
                                children: "😊"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-base text-app tabular-nums",
                                children: pad(elapsedTime)
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onHowToPlay,
                        className: "neu-btn-icon w-9 h-9 rounded-lg text-sm text-soft active:scale-90 transition-all",
                        "aria-label": language === 'jp' ? '遊び方' : 'How to play',
                        children: "?"
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/minesweeper/Header.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden md:flex md:flex-col md:fixed md:left-6 md:top-1/2 md:-translate-y-1/2 md:w-60 md:z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "retro-frame",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "screw-tl"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Header.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "screw-br"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Header.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "retro-label",
                            children: "PLAYER · STATS"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Header.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "retro-screen flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] tracking-[0.25em] text-muted uppercase",
                                            children: "PLAYER"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-lg text-app-strong truncate",
                                            children: playerName
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mt-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "neu-inset w-7 h-7 rounded-md flex items-center justify-center font-serif text-sm text-matcha shrink-0",
                                                    children: DIFF_KANJI[difficulty]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-serif text-xs text-soft",
                                                    children: diffLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-px bg-current opacity-10"
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "neu-inset px-3 py-2.5 rounded-lg flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base",
                                                    children: "💣"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-serif text-[10px] text-muted tracking-wider uppercase",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'mines')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xl text-red-600 dark:text-red-400 tabular-nums",
                                            children: pad(minesLeft)
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "neu-inset px-3 py-2.5 rounded-lg flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base",
                                                    children: "⏱"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-serif text-[10px] text-muted tracking-wider uppercase",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'time')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-xl text-app tabular-nums",
                                            children: pad(elapsedTime)
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-px bg-current opacity-10"
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onReset,
                                    className: "neu-btn-raised py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: "😊"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 142,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-sm text-app",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'retry')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onLeaderboard,
                                    className: "neu-btn-raised py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "🏆"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-sm text-soft",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onHowToPlay,
                                    className: "neu-btn-raised py-2 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "📖"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-sm text-soft",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'howToPlay')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/Header.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onBack,
                                    className: "neu-btn-subtle py-1.5 rounded-lg font-serif text-xs text-muted hover:text-app transition-colors",
                                    children: [
                                        "← ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'difficultyLabel')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Header.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/Header.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/Header.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/Header.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            !gameOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 neu-card px-2 py-2 rounded-2xl flex gap-1 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-2 font-serif text-[10px] text-muted tracking-widest uppercase",
                        children: language === 'jp' ? 'モード' : 'Mode'
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 178,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>flagMode && onFlagModeToggle(),
                        className: `px-4 py-2 rounded-xl font-serif text-sm transition-all duration-200 flex items-center ${!flagMode ? 'neu-mode-active' : 'neu-mode-inactive'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: language === 'jp' ? '開く' : 'Reveal'
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Header.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>!flagMode && onFlagModeToggle(),
                        className: `px-4 py-2 rounded-xl font-serif text-sm transition-all duration-200 flex items-center gap-1.5 ${flagMode ? 'neu-mode-active' : 'neu-mode-inactive'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "🚩"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 195,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: language === 'jp' ? '旗' : 'Flag'
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/minesweeper/Header.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/Confetti.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Confetti
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const COLORS = [
    '#B68B3F',
    '#D4A85A',
    '#7BA17B',
    '#C9828C',
    '#4A5FA8',
    '#EBE3D5'
];
function Confetti({ count = 80 }) {
    _s();
    const pieces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Confetti.useMemo[pieces]": ()=>Array.from({
                length: count
            }, {
                "Confetti.useMemo[pieces]": (_, i)=>({
                        id: i,
                        left: Math.random() * 100,
                        delay: Math.random() * 1.5,
                        duration: 2.5 + Math.random() * 2,
                        color: COLORS[Math.floor(Math.random() * COLORS.length)],
                        rotate: Math.random() * 360,
                        size: 6 + Math.random() * 8,
                        shape: Math.random() > 0.5 ? 'square' : 'circle'
                    })
            }["Confetti.useMemo[pieces]"])
    }["Confetti.useMemo[pieces]"], [
        count
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 pointer-events-none overflow-hidden z-[60]",
        children: pieces.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "confetti-piece",
                style: {
                    left: `${p.left}%`,
                    backgroundColor: p.color,
                    width: `${p.size}px`,
                    height: `${p.size * 1.6}px`,
                    borderRadius: p.shape === 'circle' ? '50%' : '2px',
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    transform: `rotate(${p.rotate}deg)`
                }
            }, p.id, false, {
                fileName: "[project]/components/minesweeper/Confetti.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/Confetti.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Confetti, "QJY4QKuHrMYZ6UmcGQtyg3YzW74=");
_c = Confetti;
var _c;
__turbopack_context__.k.register(_c, "Confetti");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/GameOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Confetti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/Confetti.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function diffLabel(diff, lang) {
    if (lang === 'jp') return ({
        beginner: '初級',
        intermediate: '中級',
        expert: '上級'
    })[diff];
    return ({
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        expert: 'Expert'
    })[diff];
}
function GameOverlay({ status, time, playerName, language, difficulty, onRetry, onSave, onReviewBoard, onBackToDifficulty }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(playerName);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GameOverlay.useEffect": ()=>{
            const id = setTimeout({
                "GameOverlay.useEffect.id": ()=>setMounted(true)
            }["GameOverlay.useEffect.id"], 50);
            return ({
                "GameOverlay.useEffect": ()=>clearTimeout(id)
            })["GameOverlay.useEffect"];
        }
    }["GameOverlay.useEffect"], []);
    const isWin = status === 'won';
    const handleSave = ()=>{
        if (saved) return;
        onSave(name.trim() || playerName);
        setSaved(true);
    };
    const buildShareText = ()=>{
        const diff = diffLabel(difficulty, language);
        if (language === 'jp') {
            return `🎉 地雷 Minesweeper をクリア！\n${diff} を ${time}秒 でクリアしました 💣\n${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'challenge')}`;
        }
        return `🎉 Cleared 地雷 Minesweeper!\n${diff} in ${time}s 💣\n${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'challenge')}`;
    };
    const handleShareX = ()=>{
        const text = buildShareText();
        const url = ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable";
        const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(intent, '_blank', 'noopener,noreferrer');
    };
    const handleCopy = async ()=>{
        const text = buildShareText() + (("TURBOPACK compile-time truthy", 1) ? `\n${window.location.href}` : "TURBOPACK unreachable");
        try {
            if (navigator.share) {
                await navigator.share({
                    text,
                    title: '地雷 Minesweeper'
                });
                return;
            }
        } catch  {
        // user cancelled native share — fall through to clipboard
        }
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(()=>setCopied(false), 1800);
        } catch  {
        // ignore
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isWin && mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Confetti$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                count: 90
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                lineNumber: 90,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 z-50 flex items-center justify-center p-4 ${isWin ? 'win-bg' : ''}`,
                style: {
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(6px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `neu-card p-7 rounded-2xl w-full max-w-sm flex flex-col gap-5 ${isWin ? 'animate-pop-in' : 'animate-shake'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-2",
                                    children: isWin ? '🎉' : '💥'
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: `font-serif text-3xl tracking-wider ${isWin ? 'text-matcha' : 'text-app-strong'}`,
                                    children: isWin ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'youWin') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'gameOver')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-xs text-muted mt-1.5 tracking-widest uppercase",
                                    children: [
                                        diffLabel(difficulty, language),
                                        " · ",
                                        playerName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        isWin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "neu-inset px-5 py-4 rounded-xl flex items-end justify-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-xs text-muted mb-1.5 tracking-widest uppercase",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'yourTime')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-5xl font-bold text-gold tabular-nums leading-none",
                                    children: time
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-lg text-soft mb-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'seconds')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this),
                        !isWin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center neu-inset px-5 py-3 rounded-xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif text-sm text-soft",
                                children: language === 'jp' ? `タイム ${time}秒` : `Time: ${time}s`
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        isWin && !saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    maxLength: 20,
                                    className: "neu-input px-4 py-2.5 rounded-xl font-serif text-sm outline-none w-full text-app placeholder:text-muted"
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSave,
                                    className: "neu-btn-primary py-2.5 px-4 rounded-xl font-serif tracking-wider transition-all duration-200 active:scale-95",
                                    children: [
                                        "💾 ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'saveScore')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this),
                        isWin && saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "neu-inset py-2 rounded-xl text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-serif text-sm text-matcha tracking-wide",
                                children: [
                                    "✓ ",
                                    language === 'jp' ? '保存しました' : 'Score saved'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                lineNumber: 162,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        isWin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 h-px bg-current opacity-10"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-xs text-muted tracking-widest uppercase",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'share')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 h-px bg-current opacity-10"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleShareX,
                                            className: "neu-btn-raised flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-serif text-sm text-app transition-all duration-200 active:scale-95",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: "𝕏"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Twitter"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCopy,
                                            className: "neu-btn-raised flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 font-serif text-sm text-app transition-all duration-200 active:scale-95",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: copied ? '✓' : '📋'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: copied ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'copied') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'copyLink')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                            lineNumber: 187,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onReviewBoard,
                            className: "neu-btn-raised w-full py-2.5 px-3 rounded-xl font-serif text-sm text-app transition-all duration-200 active:scale-95",
                            children: [
                                "↓ ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'viewBoard')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 pt-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onBackToDifficulty,
                                    className: "neu-btn-raised flex-1 py-2.5 px-3 rounded-xl font-serif text-sm text-soft transition-all duration-200 active:scale-95",
                                    children: [
                                        "← ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'backToDifficulty')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onRetry,
                                    className: `neu-btn-${isWin ? 'raised' : 'primary'} flex-1 py-2.5 px-3 rounded-xl font-serif text-sm tracking-wider
                         transition-all duration-200 active:scale-95
                         ${isWin ? 'text-app' : ''}`,
                                    children: [
                                        "↻ ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'retry')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(GameOverlay, "Derr9Sa6uKnaGk7PI3hQ5IE2KkA=");
_c = GameOverlay;
var _c;
__turbopack_context__.k.register(_c, "GameOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/Leaderboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Leaderboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TABS = [
    {
        key: 'beginner',
        en: 'Beginner',
        jp: '初級'
    },
    {
        key: 'intermediate',
        en: 'Intermediate',
        jp: '中級'
    },
    {
        key: 'expert',
        en: 'Expert',
        jp: '上級'
    }
];
function medalEmoji(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
}
function Leaderboard({ language, getByDifficulty, onClose }) {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('beginner');
    const scores = getByDifficulty(tab);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "neu-card rounded-2xl w-full max-w-md flex flex-col animate-fade-in",
            style: {
                maxHeight: '90vh'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 pt-6 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-serif text-xl tracking-widest text-app-strong",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "neu-btn-icon w-8 h-8 rounded-lg text-muted text-lg transition-all duration-150 active:scale-90",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 px-6 pb-4",
                    children: TABS.map(({ key, en, jp })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTab(key),
                            className: `flex-1 py-1.5 rounded-lg font-serif text-sm transition-all duration-200
                ${tab === key ? 'neu-toggle-active' : 'neu-toggle-inactive'}`,
                            children: language === 'jp' ? jp : en
                        }, key, false, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-[2rem_1fr_5rem_5rem] gap-2 px-6 pb-2 border-b border-stone-200 dark:border-stone-700",
                    children: [
                        'rank',
                        'name',
                        'time',
                        'date'
                    ].map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-serif text-xs text-muted tracking-wider",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, col)
                        }, col, false, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-2 flex flex-col gap-1",
                    children: scores.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-serif text-center text-muted py-8",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'noScores')
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, this) : scores.map((entry, i)=>{
                        const rank = i + 1;
                        const medal = medalEmoji(rank);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `grid grid-cols-[2rem_1fr_5rem_5rem] gap-2 py-2 rounded-lg px-1
                    transition-colors ${rank <= 3 ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-sm text-soft",
                                    children: medal ?? `#${rank}`
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 88,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-sm text-app-strong truncate",
                                    children: entry.name
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 91,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-sm text-app tabular-nums",
                                    children: [
                                        entry.time,
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'seconds')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 94,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-xs text-muted",
                                    children: entry.date
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 97,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, `${entry.name}-${entry.time}-${entry.date}`, true, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 83,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 pb-5 pt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "w-full neu-btn-raised py-2 rounded-xl font-serif text-sm text-app transition-all duration-200 active:scale-95",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'close')
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/Leaderboard.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Leaderboard, "aSMHDFRRC1G37v8JMFaCoTKuk7s=");
_c = Leaderboard;
var _c;
__turbopack_context__.k.register(_c, "Leaderboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/minesweeper/HowToPlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowToPlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
'use client';
;
;
function HowToPlay({ language, onClose }) {
    const rules = [
        {
            icon: '👆',
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'rule1')
        },
        {
            icon: '🚩',
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'rule2')
        },
        {
            icon: '⚡',
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'rule3')
        },
        {
            icon: '🏆',
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'rule4')
        },
        {
            icon: '🛡',
            text: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'rule5')
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "neu-card rounded-2xl w-full max-w-md flex flex-col gap-4 p-6 animate-fade-in",
            style: {
                maxHeight: '90vh'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-serif text-xl tracking-widest text-app-strong flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "📖"
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'howToPlay')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "neu-btn-icon w-8 h-8 rounded-lg text-muted text-lg active:scale-90 transition-all",
                            "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'close'),
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 overflow-y-auto",
                    children: [
                        rules.map((rule, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "neu-inset px-3 py-2.5 rounded-lg flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl shrink-0 mt-0.5",
                                        children: rule.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-serif text-sm text-app leading-relaxed",
                                        children: rule.text
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-serif text-sm text-soft tracking-widest uppercase mt-2 px-1",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'tips')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-2 rounded-lg flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm shrink-0",
                                            children: "💡"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-serif text-xs text-soft leading-relaxed",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'tip1')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3 py-2 rounded-lg flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm shrink-0",
                                            children: "💡"
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-serif text-xs text-soft leading-relaxed",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'tip2')
                                        }, void 0, false, {
                                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "neu-btn-primary py-2.5 rounded-xl font-serif tracking-wider active:scale-95 transition-all mt-1",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'got_it')
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/HowToPlay.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/minesweeper/HowToPlay.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/HowToPlay.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = HowToPlay;
var _c;
__turbopack_context__.k.register(_c, "HowToPlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/minesweeper/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MinesweeperPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMinesweeper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useMinesweeper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLeaderboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLeaderboard.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useSound.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$NameEntry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/NameEntry.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$DifficultySelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/DifficultySelect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/Board.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$GameOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/GameOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/Leaderboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$HowToPlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/minesweeper/HowToPlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function MinesweeperPage() {
    _s();
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('name');
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Player');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('beginner');
    const [showLeaderboard, setShowLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showHowToPlay, setShowHowToPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedForRound, setSavedForRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [flagMode, setFlagMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { state, reveal, toggleFlag, chord, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMinesweeper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMinesweeper"])(difficulty);
    const { addScore, getByDifficulty } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLeaderboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"])();
    const { play } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSound"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MinesweeperPage.useEffect": ()=>{
            const html = document.documentElement;
            if (theme === 'dark') html.classList.add('dark');
            else html.classList.remove('dark');
        }
    }["MinesweeperPage.useEffect"], [
        theme
    ]);
    const handleStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleStart]": (name, lang, th)=>{
            setPlayerName(name);
            setLanguage(lang);
            setTheme(th);
            setScreen('difficulty');
        }
    }["MinesweeperPage.useCallback[handleStart]"], []);
    const handleDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleDifficulty]": (diff)=>{
            setDifficulty(diff);
            reset(diff);
            setSavedForRound(false);
            setFlagMode(false);
            setScreen('game');
        }
    }["MinesweeperPage.useCallback[handleDifficulty]"], [
        reset
    ]);
    const handleReveal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleReveal]": (r, c)=>{
            const cell = state.board[r]?.[c];
            if (!cell || cell.state === 'flagged') return;
            play(cell.isMine && !state.firstClick ? 'lose' : 'reveal');
            reveal(r, c);
        }
    }["MinesweeperPage.useCallback[handleReveal]"], [
        reveal,
        play,
        state.board,
        state.firstClick
    ]);
    const handleFlag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleFlag]": (r, c)=>{
            play('flag');
            toggleFlag(r, c);
        }
    }["MinesweeperPage.useCallback[handleFlag]"], [
        toggleFlag,
        play
    ]);
    const handleChord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleChord]": (r, c)=>{
            play('chord');
            chord(r, c);
        }
    }["MinesweeperPage.useCallback[handleChord]"], [
        chord,
        play
    ]);
    const handleReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleReset]": ()=>{
            reset(difficulty);
            setSavedForRound(false);
            setFlagMode(false);
        }
    }["MinesweeperPage.useCallback[handleReset]"], [
        reset,
        difficulty
    ]);
    const handleRetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleRetry]": ()=>{
            reset(difficulty);
            setSavedForRound(false);
            setFlagMode(false);
        }
    }["MinesweeperPage.useCallback[handleRetry]"], [
        reset,
        difficulty
    ]);
    const handleSaveScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleSaveScore]": (name)=>{
            if (savedForRound) return;
            const date = new Date().toLocaleDateString('sv');
            addScore({
                name,
                time: state.elapsedTime,
                date,
                difficulty
            });
            setSavedForRound(true);
        }
    }["MinesweeperPage.useCallback[handleSaveScore]"], [
        addScore,
        difficulty,
        state.elapsedTime,
        savedForRound
    ]);
    const handleBackToDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleBackToDifficulty]": ()=>{
            setScreen('difficulty');
            reset(difficulty);
            setSavedForRound(false);
            setFlagMode(false);
        }
    }["MinesweeperPage.useCallback[handleBackToDifficulty]"], [
        reset,
        difficulty
    ]);
    const handleBackToName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleBackToName]": ()=>{
            setScreen('name');
        }
    }["MinesweeperPage.useCallback[handleBackToName]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MinesweeperPage.useEffect": ()=>{
            if (state.status === 'won') play('win');
            if (state.status === 'lost') play('lose');
        }
    }["MinesweeperPage.useEffect"], [
        state.status,
        play
    ]);
    if (screen === 'name') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$NameEntry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        onStart: handleStart
    }, void 0, false, {
        fileName: "[project]/app/minesweeper/page.tsx",
        lineNumber: 106,
        columnNumber: 33
    }, this);
    if (screen === 'difficulty') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$DifficultySelect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    language: language,
                    onSelect: handleDifficulty,
                    onLeaderboard: ()=>setShowLeaderboard(true),
                    onBack: handleBackToName
                }, void 0, false, {
                    fileName: "[project]/app/minesweeper/page.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                showLeaderboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    language: language,
                    getByDifficulty: getByDifficulty,
                    onClose: ()=>setShowLeaderboard(false)
                }, void 0, false, {
                    fileName: "[project]/app/minesweeper/page.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen md:pl-72",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center px-3 py-4 md:py-10 pb-24 md:pb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            minesLeft: state.minesLeft,
                            elapsedTime: state.elapsedTime,
                            language: language,
                            difficulty: difficulty,
                            playerName: playerName,
                            flagMode: flagMode,
                            onReset: handleReset,
                            onLeaderboard: ()=>setShowLeaderboard(true),
                            onHowToPlay: ()=>setShowHowToPlay(true),
                            onBack: handleBackToDifficulty,
                            onFlagModeToggle: ()=>setFlagMode((f)=>!f)
                        }, void 0, false, {
                            fileName: "[project]/app/minesweeper/page.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            board: state.board,
                            difficulty: difficulty,
                            gameOver: state.status === 'won' || state.status === 'lost',
                            flagMode: flagMode,
                            onReveal: handleReveal,
                            onFlag: handleFlag,
                            onChord: handleChord
                        }, void 0, false, {
                            fileName: "[project]/app/minesweeper/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/minesweeper/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            (state.status === 'won' || state.status === 'lost') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$GameOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                status: state.status,
                time: state.elapsedTime,
                playerName: playerName,
                language: language,
                difficulty: difficulty,
                onRetry: handleRetry,
                onSave: handleSaveScore,
                onBackToDifficulty: handleBackToDifficulty
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            showLeaderboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                language: language,
                getByDifficulty: getByDifficulty,
                onClose: ()=>setShowLeaderboard(false)
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this),
            showHowToPlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$HowToPlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                language: language,
                onClose: ()=>setShowHowToPlay(false)
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/minesweeper/page.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(MinesweeperPage, "I4BIsScGA1J0SJ5j98qIrEofsP8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMinesweeper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMinesweeper"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLeaderboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSound"]
    ];
});
_c = MinesweeperPage;
var _c;
__turbopack_context__.k.register(_c, "MinesweeperPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1oerww5._.js.map