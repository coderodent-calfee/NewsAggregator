import svgrPlugin from 'vite-plugin-svgr'

export default {
    // ...
    plugins: [
        svgrPlugin({
            svgrOptions: {
                icon: true,
                // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
    ],
}