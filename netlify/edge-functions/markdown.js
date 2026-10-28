// Markdown pour les agents IA : si une requête sur l'accueil demande « Accept: text/markdown »,
// on renvoie le résumé llms.txt en Markdown ; les navigateurs reçoivent toujours le HTML.
export default async (request, context) => {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/markdown")) return context.next();
  const res = await fetch(new URL("/llms.txt", request.url));
  if (!res.ok) return context.next();
  const md = await res.text();
  return new Response(md, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(Math.ceil(md.length / 4)),
      "vary": "Accept",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
};

export const config = { path: "/" };
