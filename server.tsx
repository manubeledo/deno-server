
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const colors:any[] = [];
const app = createApp();

app.post("/", async(req) => {
    const body = await req.formData();
    let color = body.value('color');
    colors.push(color);
    await req.redirect('/');
})

app.handle("/", async(req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),

        body: ReactDOMServer.renderToString(
            <html>
                <head>
                <meta charSet="utf-8" />
                <title>Desafio Deno</title>
                </head>
                <body style={{backgroundColor: '#CDB1E1'}}>
                <form action="/" method="post">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <input type="text" placeholder="Ingrese el nombre de un color en inglés" name="color" />
                        <button>Enviar</button>
                    </div>
                </form>
                <div>
                    <ul>
                    {
                        colors.map(color => 
                        <li style={{color}}>
                            <b style={{fontSize: '60px'}}>{color}</b>
                        </li>)
                    }
                    </ul>
                </div>
                </body>
            </html>
        ),
    });
});

app.listen({port: 8080})

// deno run --allow-read --allow-write --allow-net server.tsx