import { defineConfig } from "vite";
import { join } from "path";

export default defineConfig({
    root: join(process.cwd(), "src"),
    server: {
        port: 3000,
        open: "/index.html",
    },
    preview: {
        port: 8080,
    },
    build: {
        outDir: join(process.cwd(), "dist"),
        rollupOptions: {
            input: {
                main: "src/index.html",
                instruction: "src/quiz-instruction.html",
                quiz: "src/quiz.html",
                score: "src/score.html",
            },
        },
    },
});

// import { defineConfig } from "vite";
// import { join } from "path";

// export default defineConfig({
//     root: join(process.cwd(), "src"),
//     build: {
//         outDir: join(process.cwd(), "dist"),
//         rollupOptions: {
//             input: {
//                 score: "src/score.html",
//             },
//         },
//     },
// });
