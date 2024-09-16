if (globalThis.process?.versions?.node) {
    const originalFetch = fetch;
    const { open } = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    const { lookup } = await import("mime-types");
    fetch = async (url, opts = {}) => {
        url = new URL(url, new URL(`file://${resolve(".")}/`));
        if (url.protocol != "file:") {
            return originalFetch(url, opts);
        }
        try {
            const fd = await open(url);
            const type = lookup(url.pathname);
            const stream = fd.createReadStream();
            return new Response(stream, { headers: { "Content-Type": type } });
        } catch (e) {
            return new Response(null, { status: 404 });
        }
    }
}
