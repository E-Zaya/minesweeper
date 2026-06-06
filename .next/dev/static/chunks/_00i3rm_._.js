(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/minesweeper/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DIFFICULTY_CONFIG",
    ()=>DIFFICULTY_CONFIG
]);
const DIFFICULTY_CONFIG = {
    beginner: {
        rows: 9,
        cols: 9,
        mines: 10
    },
    intermediate: {
        rows: 16,
        cols: 16,
        mines: 40
    },
    expert: {
        rows: 16,
        cols: 30,
        mines: 99
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
        backToDifficulty: 'Change difficulty',
        newBest: 'New Best!',
        yourRank: 'Your rank',
        cleared: 'cleared',
        in: 'in',
        challenge: 'Can you beat me?'
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
        backToDifficulty: '難易度を変更',
        newBest: '自己ベスト！',
        yourRank: 'あなたの順位',
        cleared: 'クリア',
        in: '·',
        challenge: '挑戦してみる？'
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
function Cell({ cell, cellSize, onReveal, onFlag, onChord, gameOver }) {
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
                // Chord on revealed numbered cell
                onChord(cell.row, cell.col);
            } else if (!gameOver) {
                onReveal(cell.row, cell.col);
            }
        }
    }["Cell.useCallback[handleClick]"], [
        cell.row,
        cell.col,
        cell.state,
        onReveal,
        onChord,
        gameOver
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
                    onReveal(cell.row, cell.col);
                }
            }
        }
    }["Cell.useCallback[handleTouchEnd]"], [
        cell.row,
        cell.col,
        cell.state,
        onReveal,
        gameOver
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
                lineNumber: 107,
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
            lineNumber: 117,
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
            lineNumber: 133,
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
                lineNumber: 160,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/minesweeper/Cell.tsx",
            lineNumber: 150,
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
        lineNumber: 167,
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
function Board({ board, difficulty, gameOver, onReveal, onFlag, onChord }) {
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
        ref: containerRef,
        className: "w-full overflow-x-auto",
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
                            onReveal: onReveal,
                            onFlag: onFlag,
                            onChord: onChord,
                            gameOver: gameOver
                        }, `${cell.row}-${cell.col}`, false, {
                            fileName: "[project]/components/minesweeper/Board.tsx",
                            lineNumber: 47,
                            columnNumber: 15
                        }, this))
                }, row[0].row, false, {
                    fileName: "[project]/components/minesweeper/Board.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/minesweeper/Board.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/Board.tsx",
        lineNumber: 39,
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
function Header({ minesLeft, elapsedTime, language, theme, difficulty, playerName, onReset, onThemeToggle, onLangToggle, onLeaderboard, onBack }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "neu-header md:hidden w-full px-3 py-3 rounded-xl mb-3 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 min-w-[68px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: "neu-btn-icon w-8 h-8 rounded-lg text-soft text-sm transition-all duration-150 active:scale-90",
                                "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'back'),
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        children: "💣"
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-base text-red-600 dark:text-red-400 tabular-nums",
                                        children: pad(minesLeft)
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onReset,
                        className: "neu-btn-icon w-11 h-11 rounded-xl text-2xl transition-all duration-150 active:scale-90",
                        title: "Reset",
                        children: "😊"
                    }, void 0, false, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-base text-app tabular-nums",
                                children: pad(elapsedTime)
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onLangToggle,
                                className: "neu-btn-icon w-8 h-8 rounded-lg font-mono text-[10px] text-soft active:scale-90 transition-all",
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'language'),
                                children: language === 'en' ? 'JP' : 'EN'
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onThemeToggle,
                                className: "neu-btn-icon w-8 h-8 rounded-lg text-sm text-soft active:scale-90 transition-all",
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'theme'),
                                children: theme === 'light' ? '☽' : '☀'
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onLeaderboard,
                                className: "neu-btn-icon w-8 h-8 rounded-lg text-sm active:scale-90 transition-all",
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard'),
                                children: "🏆"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/minesweeper/Header.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "hidden md:flex md:flex-col md:fixed md:left-6 md:top-1/2 md:-translate-y-1/2 md:w-56 md:gap-4 md:z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "neu-card p-4 rounded-xl flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] tracking-[0.2em] text-muted uppercase",
                                children: "PLAYER"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-serif text-lg text-app truncate",
                                children: playerName
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "neu-inset w-7 h-7 rounded-md flex items-center justify-center font-serif text-sm text-matcha",
                                        children: DIFF_KANJI[difficulty]
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif text-xs text-soft",
                                        children: language === 'jp' ? ({
                                            beginner: '初級',
                                            intermediate: '中級',
                                            expert: '上級'
                                        })[difficulty] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, difficulty)
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "neu-inset p-4 rounded-xl flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "💣"
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif text-xs text-muted tracking-wider uppercase",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'mines')
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-2xl text-red-600 dark:text-red-400 tabular-nums",
                                children: pad(minesLeft)
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "neu-inset p-4 rounded-xl flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: "⏱"
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif text-xs text-muted tracking-wider uppercase",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'time')
                                    }, void 0, false, {
                                        fileName: "[project]/components/minesweeper/Header.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-2xl text-app tabular-nums",
                                children: pad(elapsedTime)
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onReset,
                        className: "neu-btn-raised py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: "😊"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-serif text-sm text-app",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'retry')
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onLangToggle,
                                className: "neu-btn-icon flex-1 h-10 rounded-lg font-mono text-xs text-soft active:scale-95 transition-all",
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'language'),
                                children: language === 'en' ? 'JP' : 'EN'
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onThemeToggle,
                                className: "neu-btn-icon flex-1 h-10 rounded-lg text-sm text-soft active:scale-95 transition-all",
                                title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'theme'),
                                children: theme === 'light' ? '☽ Dark' : '☀ Light'
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onLeaderboard,
                        className: "neu-btn-raised py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "🏆"
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-serif text-sm text-soft",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard')
                            }, void 0, false, {
                                fileName: "[project]/components/minesweeper/Header.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/minesweeper/Header.tsx",
                        lineNumber: 162,
                        columnNumber: 9
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
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/minesweeper/Header.tsx",
                lineNumber: 98,
                columnNumber: 7
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
"[project]/components/minesweeper/GameOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/minesweeper/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function GameOverlay({ status, time, playerName, language, difficulty, onRetry, onSave }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(playerName);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSave = ()=>{
        if (saved) return;
        onSave(name.trim() || playerName);
        setSaved(true);
    };
    const isWin = status === 'won';
    const diffLabel = {
        beginner: language === 'jp' ? '初級' : 'Beginner',
        intermediate: language === 'jp' ? '中級' : 'Intermediate',
        expert: language === 'jp' ? '上級' : 'Expert'
    }[difficulty];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "neu-card p-8 rounded-2xl w-full max-w-xs flex flex-col gap-5 animate-fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-5xl mb-2",
                            children: isWin ? '🎉' : '💥'
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-serif text-2xl tracking-wider text-stone-700 dark:text-washi-200",
                            children: isWin ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'youWin') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'gameOver')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-sm text-stone-400 dark:text-stone-500 mt-1",
                            children: diffLabel
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                isWin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center neu-inset px-4 py-3 rounded-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-serif text-xs text-stone-400 dark:text-stone-500 mb-0.5",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'yourTime')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-3xl font-bold text-stone-700 dark:text-washi-200",
                            children: [
                                time,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base ml-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'seconds')
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                                    lineNumber: 55,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this),
                isWin && !saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: name,
                            onChange: (e)=>setName(e.target.value),
                            maxLength: 20,
                            className: "neu-input px-4 py-2 rounded-xl font-serif text-sm outline-none w-full text-stone-700 dark:text-washi-100"
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            className: "neu-btn-primary py-2 px-4 rounded-xl font-serif tracking-wider transition-all duration-200 active:scale-95",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'saveScore')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this),
                isWin && saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center font-serif text-sm text-matcha dark:text-matcha",
                    children: language === 'jp' ? '保存しました！' : 'Score saved!'
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onRetry,
                    className: "neu-btn-raised py-2 px-4 rounded-xl font-serif tracking-wider transition-all duration-200 active:scale-95 text-stone-600 dark:text-washi-300",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'retry')
                }, void 0, false, {
                    fileName: "[project]/components/minesweeper/GameOverlay.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/minesweeper/GameOverlay.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/minesweeper/GameOverlay.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(GameOverlay, "Nl7Rv7QlmI+SZyaVPhjV2sKOpFM=");
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
                            className: "font-serif text-xl tracking-widest text-stone-700 dark:text-washi-200",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$minesweeper$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(language, 'leaderboard')
                        }, void 0, false, {
                            fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "neu-btn-icon w-8 h-8 rounded-lg text-stone-400 dark:text-stone-500 text-lg transition-all duration-150 active:scale-90",
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
                            className: "font-serif text-xs text-stone-400 dark:text-stone-500 tracking-wider",
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
                        className: "font-serif text-center text-stone-400 dark:text-stone-500 py-8",
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
                                    className: "font-mono text-sm text-stone-500 dark:text-stone-400",
                                    children: medal ?? `#${rank}`
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 88,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-serif text-sm text-stone-700 dark:text-washi-200 truncate",
                                    children: entry.name
                                }, void 0, false, {
                                    fileName: "[project]/components/minesweeper/Leaderboard.tsx",
                                    lineNumber: 91,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-sm text-stone-600 dark:text-stone-300 tabular-nums",
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
                                    className: "font-mono text-xs text-stone-400 dark:text-stone-500",
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
                        className: "w-full neu-btn-raised py-2 rounded-xl font-serif text-sm text-stone-600 dark:text-washi-300 transition-all duration-200 active:scale-95",
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
function MinesweeperPage() {
    _s();
    const [screen, setScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('name');
    const [playerName, setPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Player');
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('beginner');
    const [showLeaderboard, setShowLeaderboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savedForRound, setSavedForRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { state, reveal, toggleFlag, chord, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useMinesweeper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMinesweeper"])(difficulty);
    const { addScore, getByDifficulty } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLeaderboard$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"])();
    const { play } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useSound$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSound"])();
    // Sync theme to html
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
        }
    }["MinesweeperPage.useCallback[handleReset]"], [
        reset,
        difficulty
    ]);
    const handleRetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleRetry]": ()=>{
            reset(difficulty);
            setSavedForRound(false);
        }
    }["MinesweeperPage.useCallback[handleRetry]"], [
        reset,
        difficulty
    ]);
    const handleSaveScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MinesweeperPage.useCallback[handleSaveScore]": (name)=>{
            if (savedForRound) return;
            const date = new Date().toLocaleDateString('sv'); // YYYY-MM-DD
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
    const toggleTheme = ()=>setTheme((t)=>t === 'light' ? 'dark' : 'light');
    const toggleLang = ()=>setLanguage((l)=>l === 'en' ? 'jp' : 'en');
    if (screen === 'name') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$NameEntry$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onStart: handleStart
        }, void 0, false, {
            fileName: "[project]/app/minesweeper/page.tsx",
            lineNumber: 104,
            columnNumber: 12
        }, this);
    }
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
                    lineNumber: 110,
                    columnNumber: 9
                }, this),
                showLeaderboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    language: language,
                    getByDifficulty: getByDifficulty,
                    onClose: ()=>setShowLeaderboard(false)
                }, void 0, false, {
                    fileName: "[project]/app/minesweeper/page.tsx",
                    lineNumber: 117,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen md:pl-72",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center px-2 py-3 md:py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            minesLeft: state.minesLeft,
                            elapsedTime: state.elapsedTime,
                            language: language,
                            theme: theme,
                            difficulty: difficulty,
                            playerName: playerName,
                            onReset: handleReset,
                            onThemeToggle: toggleTheme,
                            onLangToggle: toggleLang,
                            onLeaderboard: ()=>setShowLeaderboard(true),
                            onBack: handleBackToDifficulty
                        }, void 0, false, {
                            fileName: "[project]/app/minesweeper/page.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            board: state.board,
                            difficulty: difficulty,
                            gameOver: state.status === 'won' || state.status === 'lost',
                            onReveal: handleReveal,
                            onFlag: handleFlag,
                            onChord: handleChord
                        }, void 0, false, {
                            fileName: "[project]/app/minesweeper/page.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/minesweeper/page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 129,
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
                lineNumber: 156,
                columnNumber: 9
            }, this),
            showLeaderboard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$minesweeper$2f$Leaderboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                language: language,
                getByDifficulty: getByDifficulty,
                onClose: ()=>setShowLeaderboard(false)
            }, void 0, false, {
                fileName: "[project]/app/minesweeper/page.tsx",
                lineNumber: 169,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/minesweeper/page.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(MinesweeperPage, "uH8hAtjGesb7iQFgCNJyH0XKy0U=", false, function() {
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

//# sourceMappingURL=_00i3rm_._.js.map