
const routes = {
    '/':        true,
    '/about':   true,
    '/blog':    true,
    '/contact': true,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    '/admin': true,
}

const effects = {
    mask: 'topRight',           // none | cursor | topLeft | topRight | bottomLeft | bottomRight
    gradient: {
        display: true,
        opacity: 0.85           // 0 - 1
    },
    dots: {
        display: true,
        opacity: 0.6,           // 0 - 1
        size: '20'              // 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 634
    },
    lines: {
        display: true,
    },
}

const style = {
    theme:       'dark',  // dark | light
    neutral:     'slate',         // sand | gray | slate
    brand:       'green',      // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'green',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',     // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'playful',      // rounded | playful | conservative
    surface:     'translucent',  // filled | translucent
    transition:  'all'           // all | micro | macro
}
const display = {
    location: true,
    time:     true
}

export { routes, protectedRoutes, effects, style, display };