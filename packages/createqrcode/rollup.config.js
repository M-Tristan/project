import dts from 'rollup-plugin-dts'

export default [
    {
        input: '.tmp/index.js',
        watch: { clearScreen: true },
        output: [
            {
                file: 'dist/index.umd.js',
                name: 'TWEEN',
                format: 'umd',
                exports: 'named',
            },
            {
                file: 'dist/index.amd.js',
                format: 'amd',
                exports: 'named',
            },
            {
                file: 'dist/index.cjs.js',
                format: 'cjs',
                exports: 'named',
            },
            {
                file: 'dist/index.esm.js',
                format: 'es',
                exports: 'named',
            },
            {
                file: 'dist/index.js',
                format: 'es',
                exports: 'named',
            },
        ],
    },
    {
        input: './.tmp/index.d.ts',
        watch: { clearScreen: true },
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
]
