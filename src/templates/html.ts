export function html(name : string, icons : Set<string>) {
    return `<!DOCTYPE html>
<html>
	<head>
		<title>${name}</title>
		<style>
			@import url('${name}.css');
			
			html, body { margin: 0; padding: 0; font-size: 12px; }
			body { background: #efefef; padding: 2em; font-family: Helvetica, Arial, sans-serif;  }
			h1 { border-bottom: 2px solid darkslategray; color: darkslategray; font-weight: normal; font-size: 2em }
			.box { display: inline-block; border: 2px solid darkslategray; width: 120px; margin: .5em; box-shadow: .4em .4em .4em rgba(0,0,0,.4) }
			.box__glyph { overflow: hidden; font-size: 60px; line-height: 100px; text-align: center; }
			.box__label { background: darkslategray; padding: .4em; text-align: center; color: white; }
		</style>
	</head>
	<body>
	
	<h1>${name}</h1>

    ${Array.from(icons).map(icon => `<div class="box">
        <div class="box__glyph ${name}">${icon}</div>
        <div class="box__label">${icon}</div>
    </div>`).join('')}

	</body>
</html>
`;
}
