// ════════════════════════════════════════════════════════════
// CODE ENGINE — HTML TAGS DICTIONARY
// ════════════════════════════════════════════════════════════
const HTML_TAGS = {
  'html':'The root container of the entire webpage — everything lives inside this',
  'head':'Invisible page setup — holds metadata, links to CSS, and the page title',
  'body':'Everything you actually see on the page lives inside here',
  'div':'A flexible container box — groups and layouts content',
  'span':'An inline container for styling a piece of text without breaking the flow',
  'p':'A paragraph of text — adds spacing above and below automatically',
  'h1':'The biggest, most important heading — there should only be one per page',
  'h2':'A section heading — the second level in the heading hierarchy',
  'h3':'A sub-section heading — third level','h4':'A smaller heading — fourth level',
  'h5':'A small heading — fifth level','h6':'The smallest heading — sixth level',
  'a':'A clickable link — the href attribute sets where it goes',
  'img':'Displays an image — src sets the file, alt is a text description for screen readers',
  'ul':'An unordered (bulleted) list — contains li elements',
  'ol':'An ordered (numbered) list — contains li elements',
  'li':'A single item inside a list',
  'button':'A clickable button that users can press',
  'input':'A field where users can type or select something (text, checkbox, date, etc.)',
  'form':'A container for user input — collects and submits data to a server',
  'label':'A text label attached to a form field — clicking it focuses the field',
  'select':'A dropdown menu with options to choose from',
  'option':'A single choice inside a select dropdown',
  'textarea':'A large, multi-line text input field',
  'table':'A grid of rows and columns for displaying structured data',
  'tr':'A single row inside a table','td':'A single data cell inside a table row',
  'th':'A header cell in a table — usually bold, describes the column',
  'thead':'The header section of a table — holds column labels',
  'tbody':'The main body section of a table — holds the data rows',
  'tfoot':'The footer section — usually holds totals or summaries',
  'nav':'A navigation menu area — usually holds links to other pages',
  'header':'The top section of a page — often has a logo and navigation',
  'footer':'The bottom section of a page — links, copyright, contact info',
  'main':'The primary, unique content area of the page',
  'section':'A thematic grouping of content — has its own heading',
  'article':'A self-contained piece of content (blog post, news article, card)',
  'aside':'Supplementary content beside the main content — like a sidebar',
  'figure':'A container for images or diagrams with an optional caption',
  'figcaption':'The caption or description for the figure element above',
  'details':'A collapsible section — click to show or hide the content inside',
  'summary':'The always-visible title of a details element — the clickable part',
  'dialog':'A popup dialog box or modal window',
  'script':'Where JavaScript code lives — or a link to a JS file',
  'style':'Where CSS styling rules are written directly in the HTML',
  'link':'Links to an external file — most commonly a CSS stylesheet',
  'meta':'Page information for browsers and search engines — not visible to users',
  'title':'The text shown in the browser tab and search engine results',
  'video':'Embeds a video player',
  'audio':'Embeds an audio player',
  'iframe':'Embeds another webpage or external content (like a YouTube video) inside this page',
  'canvas':'A blank drawing area — JavaScript draws graphics on it programmatically',
  'svg':'Scalable Vector Graphics — shapes that stay perfectly sharp at any size',
  'path':'A custom shape drawn with coordinate instructions inside an SVG',
  'circle':'A circle shape inside an SVG','rect':'A rectangle inside an SVG',
  'strong':'Bold text — also signals importance to screen readers and search engines',
  'b':'Bold text — visual only, no extra semantic meaning',
  'em':'Italic text — signals emphasis to screen readers',
  'i':'Italic text — visual only (also used for icons)',
  'u':'Underlined text','s':'Strikethrough text — visually crossed out',
  'code':'Displays code in a monospace font',
  'pre':'Preformatted text — preserves spaces and line breaks exactly as written',
  'blockquote':'An indented quotation from another source',
  'hr':'A horizontal dividing line','br':'A line break — forces text to the next line',
  'small':'Smaller text — for fine print or secondary information',
  'sub':'Subscript — appears below the baseline (like H₂O)',
  'sup':'Superscript — appears above the baseline (like x²)',
  'mark':'Highlighted text — like a yellow highlighter effect',
  'progress':'A progress bar showing how complete a task is',
  'template':'Holds HTML that is not rendered until activated by JavaScript',
  'noscript':'Content shown only when JavaScript is disabled — a fallback message',
  'abbr':'An abbreviation — the title attribute reveals the full text on hover',
};

// ════════════════════════════════════════════════════════════
// CSS PROPERTIES DICTIONARY
// ════════════════════════════════════════════════════════════
const CSS_PROPS = {
  'color':{e:'text color',x:'Sets the color of text'},
  'background-color':{e:'background color',x:'Sets the background color of an element'},
  'background':{e:'background',x:'Sets the background — can be a color, image, or gradient'},
  'border-color':{e:'border color',x:'Sets the color of the border line'},
  'opacity':{e:'transparency',x:'How transparent the element is (0 = invisible, 1 = fully visible)'},
  'font-size':{e:'text size',x:'How big the text is'},
  'font-family':{e:'font / typeface',x:'Which font (typeface) to use for the text'},
  'font-weight':{e:'text thickness',x:'How thick or bold the text is (100=thin, 400=normal, 700=bold)'},
  'font-style':{e:'italic / normal',x:'Sets the text to italic or keeps it normal'},
  'line-height':{e:'line spacing',x:'The vertical space between lines of text'},
  'letter-spacing':{e:'character spacing',x:'Space between individual letters'},
  'text-align':{e:'text alignment',x:'Aligns text left, right, center, or justified'},
  'text-decoration':{e:'text decoration',x:'Adds or removes underline, strikethrough, or overline on text'},
  'text-transform':{e:'text case',x:'Converts text to UPPERCASE, lowercase, or Capitalizes First Letters'},
  'text-overflow':{e:'overflow text',x:'Shows "..." when text is too long for its container'},
  'text-shadow':{e:'text shadow',x:'Adds a shadow behind the text'},
  'white-space':{e:'whitespace handling',x:'Controls how spaces and line breaks are handled'},
  'word-break':{e:'word wrapping',x:'Controls where long words can break onto the next line'},
  'width':{e:'width',x:'How wide the element is'},
  'height':{e:'height',x:'How tall the element is'},
  'max-width':{e:'max width',x:'The maximum width — cannot grow wider than this'},
  'min-width':{e:'min width',x:'The minimum width — cannot shrink narrower than this'},
  'max-height':{e:'max height',x:'The maximum height'},
  'min-height':{e:'min height',x:'The minimum height — cannot shrink shorter than this'},
  'margin':{e:'outer spacing',x:'Space outside the element — pushes neighboring elements away'},
  'margin-top':{e:'top margin',x:'Space above the element'},
  'margin-bottom':{e:'bottom margin',x:'Space below the element'},
  'margin-left':{e:'left margin',x:'Space to the left of the element'},
  'margin-right':{e:'right margin',x:'Space to the right of the element'},
  'padding':{e:'inner spacing',x:'Space inside the element between the content and the border'},
  'padding-top':{e:'top padding',x:'Space between the top of the element and its content'},
  'padding-bottom':{e:'bottom padding',x:'Space between the bottom of the element and its content'},
  'padding-left':{e:'left padding',x:'Space between the left edge and the content'},
  'padding-right':{e:'right padding',x:'Space between the right edge and the content'},
  'border':{e:'border',x:'A line drawn around the element (thickness, style, color)'},
  'border-top':{e:'top border',x:'A line on the top edge only'},
  'border-bottom':{e:'bottom border',x:'A line on the bottom edge only'},
  'border-left':{e:'left border',x:'A line on the left edge only'},
  'border-right':{e:'right border',x:'A line on the right edge only'},
  'border-radius':{e:'rounded corners',x:'Rounds the corners (50% makes a circle)'},
  'border-style':{e:'border style',x:'Whether the border is solid, dashed, dotted, or none'},
  'border-width':{e:'border thickness',x:'How thick the border line is'},
  'box-shadow':{e:'shadow',x:'A shadow effect behind the element'},
  'outline':{e:'focus outline',x:'Like a border, but does not affect layout — usually the keyboard focus ring'},
  'box-sizing':{e:'size calculation',x:'Controls whether padding is counted inside the stated width/height'},
  'display':{e:'layout type',x:'How the element is laid out: block (full row), inline, flex, grid, or none (hidden)'},
  'position':{e:'positioning',x:'How the element is positioned: static (normal flow), relative, absolute, fixed, or sticky'},
  'top':{e:'top offset',x:'Distance from the top — only works when position is set'},
  'bottom':{e:'bottom offset',x:'Distance from the bottom — only works when position is set'},
  'left':{e:'left offset',x:'Distance from the left — only works when position is set'},
  'right':{e:'right offset',x:'Distance from the right — only works when position is set'},
  'z-index':{e:'stacking order',x:'Which element appears on top when elements overlap (higher number = on top)'},
  'overflow':{e:'overflow handling',x:'What happens when content is too big: scroll, hidden, or visible'},
  'overflow-x':{e:'horizontal overflow',x:'Horizontal scrolling when content is too wide'},
  'overflow-y':{e:'vertical overflow',x:'Vertical scrolling when content is too tall'},
  'visibility':{e:'visibility',x:'Shows or hides the element — it still takes up space when hidden (unlike display:none)'},
  'float':{e:'float',x:'Pushes the element left or right, letting text wrap around it'},
  'flex':{e:'flex sizing',x:'Shorthand for how a flex item grows, shrinks, and its base size'},
  'flex-direction':{e:'flex direction',x:'Whether flex items are arranged in a row (horizontal) or column (vertical)'},
  'flex-wrap':{e:'flex wrapping',x:'Whether flex items wrap to the next line when out of space'},
  'flex-grow':{e:'flex growth',x:'How much the item expands to fill extra space (0 = does not grow)'},
  'flex-shrink':{e:'flex shrinking',x:'How much the item shrinks when there is not enough space'},
  'justify-content':{e:'main-axis alignment',x:'How items are spaced along the main axis (left-right for rows)'},
  'align-items':{e:'cross-axis alignment',x:'How items are aligned on the cross axis (up-down for rows)'},
  'align-self':{e:'self alignment',x:'Overrides align-items for just this one flex item'},
  'gap':{e:'item spacing',x:'The space between flex or grid items'},
  'row-gap':{e:'row spacing',x:'Space between rows in a flex or grid layout'},
  'column-gap':{e:'column spacing',x:'Space between columns in a flex or grid layout'},
  'order':{e:'display order',x:'Changes the visual order of a flex/grid item without changing the HTML'},
  'grid-template-columns':{e:'grid columns',x:'How many columns the grid has and how wide each one is'},
  'grid-template-rows':{e:'grid rows',x:'How many rows the grid has and how tall each one is'},
  'grid-column':{e:'column span',x:'How many columns this grid item spans'},
  'grid-row':{e:'row span',x:'How many rows this grid item spans'},
  'grid-area':{e:'grid placement',x:'Places the item in a named area or specific grid position'},
  'grid-template-areas':{e:'grid layout map',x:'A visual map naming the areas of the grid'},
  'transition':{e:'smooth animation',x:'Smoothly animates changes to properties (e.g. when you hover)'},
  'animation':{e:'animation',x:'Applies a named keyframe animation to the element'},
  'transform':{e:'transformation',x:'Rotates, scales, moves, or skews the element visually'},
  'filter':{e:'visual filter',x:'Applies effects like blur, brightness, contrast, or grayscale'},
  'backdrop-filter':{e:'background blur',x:'Blurs or filters everything behind the element (frosted glass)'},
  'cursor':{e:'mouse cursor',x:'What the cursor looks like when hovering over this element'},
  'pointer-events':{e:'click behavior',x:'Whether the element responds to mouse/touch events'},
  'user-select':{e:'text selection',x:'Whether the user can select/highlight the text'},
  'content':{e:'generated content',x:'Adds text or symbols via CSS — used with ::before and ::after'},
  'list-style':{e:'list bullets',x:'The bullet point or number style for list items'},
  'object-fit':{e:'image fitting',x:'How an image fills its container (cover=fill and crop, contain=fit inside, fill=stretch)'},
  'aspect-ratio':{e:'aspect ratio',x:'Locks the ratio of width to height (e.g. 16/9 for widescreen)'},
  'resize':{e:'resize handle',x:'Whether the user can manually resize the element by dragging'},
  'clip-path':{e:'clipping shape',x:'Clips the element to a specific shape (circle, polygon, etc.)'},
  'scroll-behavior':{e:'scroll animation',x:'Makes page scrolling smooth instead of instant'},
  'vertical-align':{e:'vertical alignment',x:'Aligns inline elements vertically relative to each other'},
};

// ════════════════════════════════════════════════════════════
// JS / PYTHON PATTERNS
// ════════════════════════════════════════════════════════════
const JS_PATTERNS = [
  [/\/\/[^\n]*/,'💬','Comment','This line is a note for developers — the browser ignores it completely'],
  [/\/\*[\s\S]*?\*\//,'💬','Block comment','Everything between /* and */ is a note — ignored when the code runs'],
  [/\bconsole\.log\s*\(/,'🖨️','console.log','Prints a value to the browser\'s developer console — for debugging, not visible to users'],
  [/\bconst\s+\w+\s*=/,'📌','const variable','Creates a named value that cannot be reassigned — the standard modern way to store data'],
  [/\blet\s+\w+\s*=/,'🔄','let variable','Creates a named value that can be changed later'],
  [/\bvar\s+\w+\s*=/,'📦','var variable','Creates a variable (older style — const or let is preferred now)'],
  [/\bfunction\s+\w+\s*\(/,'⚙️','Function definition','Defines a reusable block of code — call it by name to run it'],
  [/\bconst\s+\w+\s*=\s*\(.*?\)\s*=>/,'⚡','Arrow function','A shorter way to write a function — same behavior, more compact syntax'],
  [/\bclass\s+\w+/,'🏗️','Class','A blueprint for creating objects — bundles related data and behavior together'],
  [/\bnew\s+\w+\s*\(/,'🆕','new instance','Creates a new object from a class blueprint'],
  [/\bif\s*\(/,'🔀','If statement','Runs the code inside only if the condition in parentheses is true'],
  [/\belse\s*{/,'↩️','Else','The fallback path — runs if the IF condition was false'],
  [/\bfor\s*\(/,'🔁','For loop','Repeats the code a set number of times'],
  [/\.forEach\s*\(/,'🔂','forEach','Runs a function for every item in an array'],
  [/\.map\s*\(/,'🗺️','Array map','Transforms every item in an array and returns a new array with the results'],
  [/\.filter\s*\(/,'🔍','Array filter','Returns a new array containing only the items that pass a test'],
  [/\.reduce\s*\(/,'➕','Array reduce','Combines all array items into a single value (total, string, object, etc.)'],
  [/\.find\s*\(/,'🔎','Array find','Returns the first item in the array that matches a condition'],
  [/\.sort\s*\(/,'🔢','Array sort','Sorts an array — alphabetically by default, or by a custom rule'],
  [/\bwhile\s*\(/,'🔄','While loop','Keeps repeating as long as the condition remains true'],
  [/\bswitch\s*\(/,'🎛️','Switch statement','Checks one value against multiple possible cases — cleaner than many if/else blocks'],
  [/\btry\s*{/,'🛡️','Try block','Attempts to run code that might throw an error'],
  [/\bcatch\s*\(/,'🪤','Catch block','Handles any error thrown by the try block — prevents the whole script from crashing'],
  [/\bthrow\s+/,'💥','Throw error','Deliberately triggers an error — will be caught by a try/catch'],
  [/\breturn\s+/,'↩️','Return','Exits the function and sends back a value to wherever the function was called'],
  [/document\.getElementById\s*\(/,'🎯','getElementById','Finds a specific HTML element on the page using its id attribute'],
  [/document\.querySelector\s*\(/,'🔍','querySelector','Finds the first element matching a CSS selector'],
  [/document\.querySelectorAll\s*\(/,'🔍','querySelectorAll','Finds ALL elements matching a CSS selector — returns a list'],
  [/\.addEventListener\s*\(/,'👂','addEventListener','Waits for something to happen (click, keypress, scroll) and runs a function when it does'],
  [/\.innerHTML\b/,'📄','innerHTML','Gets or sets the HTML content inside an element'],
  [/\.textContent\b/,'📝','textContent','Gets or sets the plain text inside an element (no HTML)'],
  [/\.classList\./,'🏷️','classList','Adds, removes, toggles, or checks CSS classes on an element'],
  [/\.style\./,'🎨','style property','Directly changes a CSS property on an element using JavaScript'],
  [/\bsetTimeout\s*\(/,'⏰','setTimeout','Runs a function once after a delay (number is in milliseconds)'],
  [/\bsetInterval\s*\(/,'⏱️','setInterval','Runs a function repeatedly at a fixed time interval'],
  [/\bfetch\s*\(/,'🌐','fetch()','Sends a network request to a URL — to load or send data from a server'],
  [/\basync\s+function|\basync\s+\(/,'⏳','async function','A function that can pause and wait for slow operations like network requests'],
  [/\bawait\s+/,'⏸️','await','Pauses the async function until the slow operation finishes'],
  [/\bnew\s+Promise\s*\(/,'🤝','Promise','Represents a value that will be available in the future'],
  [/\.then\s*\(/,'✅','.then()','Runs when a promise succeeds — chains async operations'],
  [/\.catch\s*\(/,'❌','.catch()','Runs when a promise fails — handles async errors'],
  [/\bJSON\.parse\s*\(/,'📦','JSON.parse','Converts a JSON text string into a JavaScript object'],
  [/\bJSON\.stringify\s*\(/,'📄','JSON.stringify','Converts a JavaScript object into a JSON text string'],
  [/\blocalStorage\./,'💾','localStorage','Saves or reads data in the browser — stays saved even after closing the tab'],
  [/\bimport\s+.*\bfrom\b/,'📥','import','Loads code from another file or module'],
  [/\bexport\s+/,'📤','export','Makes code available to be imported by other files'],
  [/\bObject\.keys\s*\(/,'🔑','Object.keys','Returns an array of all the property names in an object'],
  [/\bObject\.values\s*\(/,'📋','Object.values','Returns an array of all the values in an object'],
  [/\bMath\.\w+\s*\(/,'🔢','Math function','Performs a mathematical operation (round, floor, abs, max, min, random, etc.)'],
  [/\bparseInt\s*\(|\bparseFloat\s*\(/,'🔢','Parse number','Converts a text string into a number'],
  [/\.\.\.\w+/,'📂','Spread operator (...)','Expands an array or object — unpacks its items into individual elements'],
];

const PY_PATTERNS = [
  [/^\s*#/m,'💬','Comment','A note for developers — Python ignores this line completely'],
  [/\bprint\s*\(/,'🖨️','print()','Outputs text or values to the screen/console'],
  [/\bdef\s+\w+\s*\(/,'⚙️','Function definition','Defines a reusable block of code — call it by name to run it'],
  [/\bclass\s+\w+/,'🏗️','Class','A blueprint for creating objects with shared data and behavior'],
  [/\bif\s+.*:/,'🔀','If statement','Runs the code below only if the condition is true'],
  [/\belif\s+.*:/,'🔀','Elif','Checks another condition if the previous if/elif was false'],
  [/\belse\s*:/,'↩️','Else','Runs if all conditions above were false — the default path'],
  [/\bfor\s+\w+\s+in\s+/,'🔁','For loop','Loops through each item in a collection one by one'],
  [/\bwhile\s+.*:/,'🔄','While loop','Keeps repeating while the condition is true'],
  [/\bimport\s+\w+|\bfrom\s+\w+\s+import/,'📥','Import','Loads an external library or module to use its functions'],
  [/\breturn\s+/,'↩️','Return','Exits the function and sends back a value'],
  [/\btry\s*:/,'🛡️','Try block','Attempts code that might fail — error is caught by except'],
  [/\bexcept[\s:]/,'🪤','Except block','Handles any error raised in the try block'],
  [/\braise\s+/,'💥','Raise exception','Deliberately triggers an error'],
  [/\blambda\s+.*:/,'⚡','Lambda','A short one-line anonymous function'],
  [/\blen\s*\(/,'📏','len()','Returns the number of items in a list, string, or other collection'],
  [/\brange\s*\(/,'🔢','range()','Generates a sequence of numbers — often used in for loops'],
  [/\bopen\s*\(/,'📂','open()','Opens a file for reading or writing'],
  [/\bwith\s+open\s*\(/,'📂','with open','Opens a file safely — automatically closes it when done'],
  [/\binput\s*\(/,'⌨️','input()','Waits for the user to type something and press Enter'],
  [/\benumerate\s*\(/,'🔢','enumerate()','Loops with both the index number and the item'],
  [/\bzip\s*\(/,'🤝','zip()','Combines two or more lists into pairs'],
  [/\bmap\s*\(/,'🗺️','map()','Applies a function to every item in a list'],
  [/\bfilter\s*\(/,'🔍','filter()','Keeps only the items that pass a test'],
  [/\b@\w+/,'🎀','Decorator','Wraps a function to add extra behavior — starts with @'],
  [/\byield\s+/,'⏸️','Yield','Pauses a generator function and returns a value, then continues later'],
  [/\basync\s+def\s+/,'⏳','Async function','A function that can pause to wait for slow operations'],
  [/\bawait\s+/,'⏸️','Await','Waits for an async operation to complete before continuing'],
  [/\bNone\b/,'🚫','None','Represents the absence of a value — like null in other languages'],
  [/\bTrue\b|\bFalse\b/,'⚡','Boolean','A true/false value — the two possible states of a yes/no question'],
];

// ════════════════════════════════════════════════════════════
// CODE EXPLAINER ENGINE
// ════════════════════════════════════════════════════════════
function detectCodeLang(text) {
  const h = (text.match(/<[a-z][a-z0-9]*[\s>\/]/gi)||[]).length;
  const c = (text.match(/[a-z-]+\s*:\s*[^;\n{]+;/g)||[]).length;
  const j = (text.match(/\b(const|let|function|document\.|addEventListener|querySelector|=>|\.map\(|\.filter\()\b/g)||[]).length;
  const p = (text.match(/\b(def |class |import |print\(|elif |self\.)\b/g)||[]).length;
  const scores = {html:h,css:c,javascript:j,python:p};
  const max = Math.max(h,c,j,p);
  if (max === 0) return 'mixed';
  return Object.keys(scores).find(k=>scores[k]===max)||'mixed';
}

function explainCode(raw) {
  const lang = detectCodeLang(raw);
  const sections = [];

  // ── HTML ──
  if (lang === 'html' || (raw.includes('<') && raw.includes('>'))) {
    const tagRe = /<(\/?)([a-z][a-z0-9]*)([^>]*)(\/?)>/gi;
    let m, seen = {}, htmlItems = [];
    while ((m = tagRe.exec(raw)) !== null) {
      const isClose = m[1] === '/'; const tag = m[2].toLowerCase(); const attrs = m[3]||'';
      if (!isClose && HTML_TAGS[tag] && !seen[tag+attrs.slice(0,30)]) {
        seen[tag+attrs.slice(0,30)] = true;
        const attrNotes = [];
        const attrPairs = [
          [/\bhref=["']([^"']+)["']/, v => `links to: ${v}`],
          [/\bsrc=["']([^"']+)["']/, v => `loads: ${v}`],
          [/\bid=["']([^"']+)["']/, v => `ID: "${v}" (used by CSS/JS to find this element)`],
          [/\bclass=["']([^"']+)["']/, v => `CSS class: "${v}"`],
          [/\btype=["']([^"']+)["']/, v => `type: ${v}`],
          [/\bplaceholder=["']([^"']+)["']/, v => `placeholder: "${v}"`],
          [/\balt=["']([^"']+)["']/, v => `image description: "${v}"`],
          [/\bfor=["']([^"']+)["']/, v => `links to input with id: "${v}"`],
          [/\bvalue=["']([^"']+)["']/, v => `default value: "${v}"`],
          [/\bname=["']([^"']+)["']/, v => `form field name: "${v}"`],
        ];
        attrPairs.forEach(([re,fn]) => { const r = attrs.match(re); if(r) attrNotes.push(fn(r[1])); });
        htmlItems.push({ tag:`<${tag}>`, explain:HTML_TAGS[tag], attrs:attrNotes });
      }
    }
    if (htmlItems.length) sections.push({ type:'html', items:htmlItems });
  }

  // ── CSS ──
  if (lang === 'css' || (raw.includes('{') && raw.includes(':') && raw.includes(';'))) {
    const ruleRe = /([^{/@][^{]*)\{([^}]+)\}/g;
    let rm, cssRules = [];
    while ((rm = ruleRe.exec(raw)) !== null) {
      const selector = rm[1].trim().replace(/\n/g,' ');
      const decl = rm[2];
      const props = [];
      const propRe = /([\w-]+)\s*:\s*([^;!\n]+)[;!]?/g;
      let pm;
      while ((pm = propRe.exec(decl)) !== null) {
        const p = pm[1].toLowerCase().trim(), v = pm[2].trim();
        if (CSS_PROPS[p]) props.push({ prop:p, val:v, effect:CSS_PROPS[p].e, explain:CSS_PROPS[p].x });
      }
      if (props.length) cssRules.push({ selector, props });
    }
    if (cssRules.length) sections.push({ type:'css', rules:cssRules });
  }

  // ── JS ──
  if (lang === 'javascript' || lang === 'mixed') {
    const found = [], seenNames = new Set();
    JS_PATTERNS.forEach(([re, emoji, name, explain]) => {
      const r = new RegExp(typeof re === 'string' ? re : re.source, 'gm');
      if (r.test(raw) && !seenNames.has(name)) {
        seenNames.add(name);
        found.push({ emoji, name, explain });
      }
    });
    if (found.length) sections.push({ type:'js', patterns:found });
  }

  // ── Python ──
  if (lang === 'python') {
    const found = [], seenNames = new Set();
    PY_PATTERNS.forEach(([re, emoji, name, explain]) => {
      const r = new RegExp(typeof re === 'string' ? re : re.source, 'gm');
      if (r.test(raw) && !seenNames.has(name)) {
        seenNames.add(name);
        found.push({ emoji, name, explain });
      }
    });
    if (found.length) sections.push({ type:'python', patterns:found });
  }

  return { lang, sections };
}

function renderCode(raw) {
  const { lang, sections } = explainCode(raw);
  const langLabels = { html:'HTML', css:'CSS', javascript:'JavaScript', python:'Python', mixed:'Mixed / Unknown' };
  const chipClass = { html:'chip-html', css:'chip-css', javascript:'chip-js', python:'chip-py', mixed:'' };

  let html = `<div class="lang-badge lang-${lang}">💻 Detected: ${langLabels[lang]||lang}</div>`;

  const totalItems = sections.reduce((a,s) => {
    if (s.type==='html') return a + s.items.length;
    if (s.type==='css') return a + s.rules.length;
    if (s.type==='js'||s.type==='python') return a + s.patterns.length;
    return a;
  }, 0);

  if (!totalItems) {
    html += `<div class="verdict-box"><div class="verdict-label">Nothing decoded</div><div class="verdict-text">No recognizable HTML tags, CSS properties, or JavaScript/Python patterns found. Make sure the code is pasted correctly, or try selecting the correct language tab.</div></div>`;
    return html;
  }

  html += `<div class="summary-grid">
    <div class="summary-card sc-blue"><div class="sc-value">${totalItems}</div><div class="sc-label">Elements decoded</div></div>
    <div class="summary-card sc-blue"><div class="sc-value">${langLabels[lang]}</div><div class="sc-label">Language</div></div>
    <div class="summary-card sc-blue"><div class="sc-value">${sections.length}</div><div class="sc-label">Code sections</div></div>
  </div>`;

  sections.forEach(section => {
    if (section.type === 'html') {
      html += `<div class="section-label" style="margin-bottom:0.75rem">HTML Elements</div>`;
      section.items.forEach(item => {
        html += `<div class="code-tag-card">
          <span class="code-tag-chip chip-html">&lt;/&gt;</span>
          <div class="code-tag-body">
            <div class="code-tag-name">${escapeHtml(item.tag)}</div>
            <div class="code-tag-explain">${item.explain}</div>
            ${item.attrs.length ? `<div class="code-tag-attrs">${item.attrs.map(a=>`<span class="code-attr">${escapeHtml(a)}</span>`).join('')}</div>` : ''}
          </div>
        </div>`;
      });
    }

    if (section.type === 'css') {
      html += `<div class="section-label" style="margin-bottom:0.75rem">CSS Rules</div>`;
      section.rules.forEach(rule => {
        html += `<div class="css-rule-block">
          <div class="css-selector">${escapeHtml(rule.selector)} { ... }</div>`;
        rule.props.forEach(p => {
          html += `<div class="css-prop-row">
            <span class="css-prop-name">${escapeHtml(p.prop)}</span>
            <span class="css-prop-val">${escapeHtml(p.val.length>18 ? p.val.slice(0,18)+'…' : p.val)}</span>
            <span class="css-prop-explain">→ sets the <strong>${p.effect}</strong> — ${p.explain}</span>
          </div>`;
        });
        html += `</div>`;
      });
    }

    if (section.type === 'js' || section.type === 'python') {
      const label = section.type === 'js' ? 'JavaScript Patterns' : 'Python Patterns';
      const chip = section.type === 'js' ? 'chip-js' : 'chip-py';
      const chipLabel = section.type === 'js' ? 'JS' : 'PY';
      html += `<div class="section-label" style="margin-bottom:0.75rem">${label}</div>`;
      section.patterns.forEach(p => {
        html += `<div class="code-pattern-card">
          <span class="pattern-emoji">${p.emoji}</span>
          <div>
            <div class="pattern-name"><span class="code-tag-chip ${chip}" style="margin-right:0.4rem">${chipLabel}</span>${p.name}</div>
            <div class="pattern-explain">${p.explain}</div>
          </div>
        </div>`;
      });
    }
  });

  html += `<div style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--muted);padding:0.75rem;border-top:1px solid var(--border);line-height:1.5;margin-top:0.5rem">Pattern matching — not a compiler. This identifies what each element does, not every edge case. Complex logic needs human understanding.</div>`;
  return html;
}
