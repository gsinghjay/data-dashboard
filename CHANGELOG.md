# CHANGELOG


## v1.7.1 (2025-05-11)

### Bug Fixes

- Remove rounded corners from navbar
  ([`1eb1be3`](https://github.com/gsinghjay/data-dashboard/commit/1eb1be39e5aee2de21cf4ce51740407581362a05))

### Chores

- Add data exports for visualization reference
  ([`dfd7179`](https://github.com/gsinghjay/data-dashboard/commit/dfd717964e7a05c77a2ac4afc7f1148832c024d6))

### Documentation

- Add color scheme guidelines for Educated Horizons palette
  ([`0af0aaa`](https://github.com/gsinghjay/data-dashboard/commit/0af0aaa4861103f5b06e33fef2ba51194a6fddcf))

- Add data insights documentation for visualization design
  ([`7ab0caf`](https://github.com/gsinghjay/data-dashboard/commit/7ab0caf31569549022e946316d959abd0e54e9a2))

- Add detailed implementation specifications for design system
  ([`9c591e3`](https://github.com/gsinghjay/data-dashboard/commit/9c591e36ecbe7d74b8c96f91ee1a8f12d67f31a9))

- Add layout principles for dashboard structure
  ([`489b544`](https://github.com/gsinghjay/data-dashboard/commit/489b5448e6ff552eae501ffcb661c985d535abac))

- Add narrative structure documentation for storytelling flow
  ([`79edf07`](https://github.com/gsinghjay/data-dashboard/commit/79edf076385de8081cae9dbaccc517e5333940b6))

- Add next development steps to README
  ([`d5364ea`](https://github.com/gsinghjay/data-dashboard/commit/d5364ea98de3b1ce434741e5e886ac8248524cbb))

- Add typography and labeling guidelines for consistent UI
  ([`4890fd1`](https://github.com/gsinghjay/data-dashboard/commit/4890fd1f72a23263b5f55b5259a336832fc1a2aa))

- Update README with current project status and features
  ([`49d5081`](https://github.com/gsinghjay/data-dashboard/commit/49d508109e5063fa0e79f6eb92981b80e9e060fd))


## v1.7.0 (2025-05-11)

### Bug Fixes

- Improve FertilityBarChart layout and comparison mode
  ([`e364690`](https://github.com/gsinghjay/data-dashboard/commit/e364690fa66d10ebb55c4bc523c1226fa5896acc))

### Chores

- Add better-sqlite3 and type dependencies
  ([`856a78d`](https://github.com/gsinghjay/data-dashboard/commit/856a78df82211018fa41f25af9e4509d07600079))

### Features

- Add API endpoint for education comparison data
  ([`6a45351`](https://github.com/gsinghjay/data-dashboard/commit/6a45351ebe2f562ed902002ec625c5046499231f))

- Add API endpoint for education groups
  ([`d85e159`](https://github.com/gsinghjay/data-dashboard/commit/d85e159ee35a50b5b17edbca8e5dffe26afa590b))

- Add API endpoint for fertility rates with filtering
  ([`dbf10a6`](https://github.com/gsinghjay/data-dashboard/commit/dbf10a6b1d93eeb4d3be08fc76780bc214d8cf39))

- Add API endpoint for national trends data
  ([`d4b70ff`](https://github.com/gsinghjay/data-dashboard/commit/d4b70ffaee22be1a26c8371a12c6587efa76be75))

- Add API endpoint for state comparison data
  ([`aba0c09`](https://github.com/gsinghjay/data-dashboard/commit/aba0c091a8906f743f5a8b6c6d4a5e0c6e1ad852))

- Add API endpoint for states data
  ([`4ce7716`](https://github.com/gsinghjay/data-dashboard/commit/4ce7716ff82261622046cbad1dfa6767717ab817))

- Add API endpoint for summary statistics
  ([`9458162`](https://github.com/gsinghjay/data-dashboard/commit/945816200e6d38ff5103ce6e02252ffa22bb2f3a))

- Create API client utilities for data fetching
  ([`df30640`](https://github.com/gsinghjay/data-dashboard/commit/df30640109f3acbc0ab69847abc2a2492f8b2c7d))

- Create API test page for endpoint verification
  ([`cbecaf6`](https://github.com/gsinghjay/data-dashboard/commit/cbecaf6ecce51040ee61ecf6cba4722e3a1226f4))

- Implement bar chart for fertility rates by education level
  ([`0fd134e`](https://github.com/gsinghjay/data-dashboard/commit/0fd134e68ab001e4d093949d205c6efe58644ca9))

- Implement custom hook for fertility data management
  ([`3ee4131`](https://github.com/gsinghjay/data-dashboard/commit/3ee4131e3118b171055089004f9fc989b1875acc))

- Implement SQLite database access utility
  ([`d867fef`](https://github.com/gsinghjay/data-dashboard/commit/d867fef805bd6e92a00d1a5b576777affc92c69c))

- Integrate fertility bar chart on home page
  ([`09e1547`](https://github.com/gsinghjay/data-dashboard/commit/09e1547c7f81bfc49b57cc98138e220e9abd4443))

### Refactoring

- Update DataContext to use new data fetching hook
  ([`504b98d`](https://github.com/gsinghjay/data-dashboard/commit/504b98dc12898366b7b564ce87aff5c916a901d6))


## v1.6.0 (2025-05-11)

### Bug Fixes

- Improve data handling in process_data.py
  ([`04551f0`](https://github.com/gsinghjay/data-dashboard/commit/04551f0811fb9297c9d36d913fd5a1d863cb40fc))

- Resolve ID column conflict in database combination script
  ([`91f6f04`](https://github.com/gsinghjay/data-dashboard/commit/91f6f045fd2206b0e2c521729be7374359880392))

- Update combine_databases script generation to handle ID columns properly
  ([`4dd8b18`](https://github.com/gsinghjay/data-dashboard/commit/4dd8b18d14752dc3008a2d83e69b828383c24d74))

### Build System

- Add package-lock.json for dependency versioning
  ([`f53703c`](https://github.com/gsinghjay/data-dashboard/commit/f53703c550023a05bace96b9fbff81933704d959))

- Add package.json for project dependencies
  ([`f28f8b3`](https://github.com/gsinghjay/data-dashboard/commit/f28f8b329ab7395b53663e99f85945b0d2c92378))

### Chores

- Add cursor IDE config ignore file
  ([`e6a8827`](https://github.com/gsinghjay/data-dashboard/commit/e6a882701f592d57031016d2dc796fbbc60cf873))

- Add cursor indexing ignore configuration
  ([`33f7917`](https://github.com/gsinghjay/data-dashboard/commit/33f791700e939cf294633001651544a34115df1a))

- Add database directory structure
  ([`eb9f4b9`](https://github.com/gsinghjay/data-dashboard/commit/eb9f4b9c9e150e31b129ad841e39d60b7722c0e2))

- Add gitignore for data files and logs
  ([`1dd15c1`](https://github.com/gsinghjay/data-dashboard/commit/1dd15c1dc277f8b63c53609f34e0d442f4682eb4))

- Add Next.js TypeScript declaration file
  ([`2d94257`](https://github.com/gsinghjay/data-dashboard/commit/2d94257244db70952b93758ab9d489a87b303be3))

- Added docs and startup scripts
  ([`1e4e40b`](https://github.com/gsinghjay/data-dashboard/commit/1e4e40bf20b50f2fc1763c1dc6c02a87e2191e88))

- Moved old project to archive folder
  ([`88a9928`](https://github.com/gsinghjay/data-dashboard/commit/88a9928d88dcb93a41d7c09bda0f5b6c70be9af2))

- Update gitignore for data files and logs
  ([`c4f7cf7`](https://github.com/gsinghjay/data-dashboard/commit/c4f7cf78bf4dafba3a4cebb48ae3e7e4979f1859))

### Documentation

- Add data dictionary for ACS PUMS variables
  ([`73ae863`](https://github.com/gsinghjay/data-dashboard/commit/73ae863d1dcfac7b52be2e6aac563e3d6b3cbbac))

- Add documentation for data processing approach
  ([`ba1adae`](https://github.com/gsinghjay/data-dashboard/commit/ba1adae37775f24c5c50864f013b5543504fd9e1))

- Add project narrative documentation
  ([`da02460`](https://github.com/gsinghjay/data-dashboard/commit/da02460af03cc509c7b2cd2819338564d2cdbca8))

- Add verification of ACS PUMS columns across years
  ([`980616f`](https://github.com/gsinghjay/data-dashboard/commit/980616fc2055080787d07b7d2ca06cac5573f6d6))

- Create comprehensive README based on project narrative
  ([`c5cb2a4`](https://github.com/gsinghjay/data-dashboard/commit/c5cb2a47beaa12b333b0c0fcf5fc1e7144c52cff))

- Update data dictionary to document SQLite database structure and access methods
  ([`3881e1c`](https://github.com/gsinghjay/data-dashboard/commit/3881e1c484c2effd7f36b0239618edfd9994c91f))

- Update scripts documentation
  ([`5159cef`](https://github.com/gsinghjay/data-dashboard/commit/5159cef83d43662670f3d463c8bf51832ebe031b))

### Features

- Add ACS PUMS data download script
  ([`17ef78d`](https://github.com/gsinghjay/data-dashboard/commit/17ef78d4e38bc7d424e32f2b3789f70dd5e7bd7d))

- Add configurable year-specific test script
  ([`f243d3e`](https://github.com/gsinghjay/data-dashboard/commit/f243d3ecf2c3d02f541ba65ac8f39ec2da449a34))

- Add frontend source code structure
  ([`a762b1b`](https://github.com/gsinghjay/data-dashboard/commit/a762b1bb5855b2df480ef3d6401b3f016786601c))

- Add orchestration script for full data pipeline
  ([`43d71d5`](https://github.com/gsinghjay/data-dashboard/commit/43d71d58944283dd4900f2a60e93429b514bcedc))

- Add reliable sequential processing script
  ([`41f82fa`](https://github.com/gsinghjay/data-dashboard/commit/41f82fa320438c05ce822d99e7b6495b2105c52a))

- Add script to combine individual year databases into final dataset
  ([`a07b08f`](https://github.com/gsinghjay/data-dashboard/commit/a07b08fea27ca9320eabc46833b3435ed3fe4053))

- Add test script for 2022 data
  ([`fa00b78`](https://github.com/gsinghjay/data-dashboard/commit/fa00b78ffdb68f38135b189f1ff231c7dc841f49))

- Add test script for single year processing
  ([`a0538ce`](https://github.com/gsinghjay/data-dashboard/commit/a0538cef9282327274c22361711a8233b3ccfb0a))

- Create main data processing script for ACS PUMS data
  ([`54e6463`](https://github.com/gsinghjay/data-dashboard/commit/54e6463fc9ce2c2df855f423c152835411dffa8f))

- Implement parallel processing for improved performance
  ([`332b4d0`](https://github.com/gsinghjay/data-dashboard/commit/332b4d0cc8d3b2fcd710c802e39f4124f0f3d117))

### Refactoring

- Remove unreliable parallel processing script
  ([`52ba510`](https://github.com/gsinghjay/data-dashboard/commit/52ba51045689b6bfc8e7f4701a80d3a64743c16b))


## v1.5.0 (2025-02-28)

### Build System

- Update requirements.txt to remove built-in modules
  ([`9fb9807`](https://github.com/gsinghjay/data-dashboard/commit/9fb9807f8addf2324678072015b4b2989069c8c6))

### Documentation

- **etl**: Add documentation for ETL scripts and analysis pipeline
  ([`43c2bbd`](https://github.com/gsinghjay/data-dashboard/commit/43c2bbdd6fd77b3cd2f179415bb547a945f6a2ca))

### Features

- **analysis**: Add initial analysis outputs and visualizations
  ([`0b8922a`](https://github.com/gsinghjay/data-dashboard/commit/0b8922af79d440ee403d67790b55542aed5aa48c))

- **etl**: Add analysis generation script for food safety insights
  ([`8b00e62`](https://github.com/gsinghjay/data-dashboard/commit/8b00e6233ae7f821bacb43b791925d8142463b9e))

- **etl**: Add database initialization script for food safety data
  ([`543c4e7`](https://github.com/gsinghjay/data-dashboard/commit/543c4e7f9eefb8e109e96c2f409c5a71fddfcc14))

- **etl**: Add pipeline runner script for end-to-end analysis
  ([`5028b2b`](https://github.com/gsinghjay/data-dashboard/commit/5028b2ba4b07b62ad6c5d9173053c4971ecb7f60))


## v1.4.0 (2025-02-28)

### Bug Fixes

- **data**: Improve state data handling and nationwide recall detection in FSIS data processing
  ([`d8f5322`](https://github.com/gsinghjay/data-dashboard/commit/d8f53220618935a3c4dd195575d3ad90c2f2ca6d))

- **viz**: Correct recall count distribution in geographic map visualization
  ([`f6703ef`](https://github.com/gsinghjay/data-dashboard/commit/f6703efe42724b2ff8a53a2bfdb0b96d36a71242))

- **viz**: Improve tooltip visibility and styling in recall duration chart
  ([`c667be5`](https://github.com/gsinghjay/data-dashboard/commit/c667be5628637540fd42ea0ae9512a92b8a95e74))

- **viz**: Resolve data handling and tooltip issues in recall recovery chart
  ([`a811f5c`](https://github.com/gsinghjay/data-dashboard/commit/a811f5cdc4a5179c196ef6979935ea9091c76865))

### Features

- **app**: Update App.jsx to include new FSISRecallsPage component
  ([`94eb6a1`](https://github.com/gsinghjay/data-dashboard/commit/94eb6a14acd8716bf25b93c67e89ac5cd5770fba))

- **recalls**: Add FSISRecallsPage component to showcase all FSIS recall visualizations
  ([`9ede0bf`](https://github.com/gsinghjay/data-dashboard/commit/9ede0bf9cac54062fd93078643ffa21c52a045d8))

- **recalls**: Add RecallDurationChart component for visualizing FSIS recall durations
  ([`d6353cb`](https://github.com/gsinghjay/data-dashboard/commit/d6353cb746aeeba80b1cbbbbe853758ed96c2599))

- **recalls**: Add RecallGeographicMap component for visualizing FSIS recalls by state
  ([`ddd2d52`](https://github.com/gsinghjay/data-dashboard/commit/ddd2d52785518d4f92c9e442714a7cceb578f9e9))

- **recalls**: Add RecallRecoveryChart component for visualizing FSIS recall recovery rates
  ([`9cf8990`](https://github.com/gsinghjay/data-dashboard/commit/9cf8990ae02bfe6a9139f0fa8f9f7c36a5930532))

- **recalls**: Add RecallTimelineChart component for visualizing FSIS recalls over time
  ([`2f665fa`](https://github.com/gsinghjay/data-dashboard/commit/2f665fa0aca2699aec20afa4afd4e2d2556f9325))


## v1.3.0 (2025-02-28)

### Features

- **charts**: Add D3.js visualization components for food safety dashboard
  ([`62deef4`](https://github.com/gsinghjay/data-dashboard/commit/62deef42af132b9872b1ead5b6f2e75db8265754))

- **routing**: Update App.jsx to include Dashboard as home page
  ([`1673a1c`](https://github.com/gsinghjay/data-dashboard/commit/1673a1c6c247e895d82c0c366181accb2b352f8a))

- **ui**: Add main Dashboard component with tabbed navigation
  ([`d7ca5d3`](https://github.com/gsinghjay/data-dashboard/commit/d7ca5d3f437a7b70301ef2319c42a8f2d1106fa3))


## v1.2.0 (2025-02-28)

### Bug Fixes

- **charts**: Improve bar chart value label visibility
  ([`1d53c85`](https://github.com/gsinghjay/data-dashboard/commit/1d53c855af8684d76847240687ba0286eab001ae))

### Features

- **charts**: Enhance world obesity map with improved data processing
  ([`3db000d`](https://github.com/gsinghjay/data-dashboard/commit/3db000d604672c82922e867d2fc0d8d7f55f89f0))

- **data**: Add data processing utilities and CSV datasets
  ([`701e4ac`](https://github.com/gsinghjay/data-dashboard/commit/701e4ac6b709ddc2a1a910151048ccf3ff44224b))


## v1.1.0 (2025-02-21)

### Build System

- **deps**: Add d3 and topojson-client dependencies
  ([`e9fac4d`](https://github.com/gsinghjay/data-dashboard/commit/e9fac4d85244df1ca0e028dcfd844391757e0ab4))

### Chores

- **assets**: Add public directory and assets
  ([`d540aba`](https://github.com/gsinghjay/data-dashboard/commit/d540abaf33f05a444bcaa5d4ce14a54ead71fa68))

- **cleanup**: Add remaining source files and assets
  ([`3be5560`](https://github.com/gsinghjay/data-dashboard/commit/3be55601aa4c94c0d502da17ec98f79c3424dd8f))

- **deps**: Add bootstrap, d3, and react-router dependencies
  ([`268e404`](https://github.com/gsinghjay/data-dashboard/commit/268e4041b9e026535f8fd164741b18ba9bd2579a))

- **git**: Add comprehensive gitignore files
  ([`5fcdcbb`](https://github.com/gsinghjay/data-dashboard/commit/5fcdcbb21ce32684337bee691ccfbb78fdf31621))

- **lint**: Add eslint configuration
  ([`540d196`](https://github.com/gsinghjay/data-dashboard/commit/540d1961743dd4479e1ee28174ec113da9697e35))

### Code Style

- Add custom styles and bootstrap overrides
  ([`1f5ebed`](https://github.com/gsinghjay/data-dashboard/commit/1f5ebedbf78e4c0c47e2d0a604364422e99f726c))

### Documentation

- **readme**: Add explanatory text for data visualizations feat: enhance diagram context and
  correlations
  ([`718ab3c`](https://github.com/gsinghjay/data-dashboard/commit/718ab3c40e7cd119dd43afedc8eb73f5fc14bef6))

- **readme**: Updated links to fact check by perplexity
  ([`6aa1ba3`](https://github.com/gsinghjay/data-dashboard/commit/6aa1ba39aceb592110c0063e65f99ea94026435c))

### Features

- **charts**: Add reusable d3 bar chart component
  ([`1076657`](https://github.com/gsinghjay/data-dashboard/commit/10766573d8c8961963e8a2fee244002d33e83bcd))

- **frontend**: Initialize vite react project structure
  ([`9f987e2`](https://github.com/gsinghjay/data-dashboard/commit/9f987e2f2a48cfa27233cbe971f9177ef85256b9))

- **layout**: Implement navbar and base layout components
  ([`ac6f742`](https://github.com/gsinghjay/data-dashboard/commit/ac6f7423da9917f557e788c1fd9361917790099c))

- **pages**: Add FDA substances page with sample data
  ([`836babc`](https://github.com/gsinghjay/data-dashboard/commit/836babc3f138cc593ad8aadf50308b7e9ba6e6a6))

- **pages**: Add obesity data page with world map integration
  ([`62ddce9`](https://github.com/gsinghjay/data-dashboard/commit/62ddce967c3fd60205923155cc7d47754f420d79))

- **router**: Implement react-router with basic routes
  ([`ca44c89`](https://github.com/gsinghjay/data-dashboard/commit/ca44c898db72d563d48724d06ab1fe36c15f4465))

- **viz**: Add interactive world map visualization for obesity data
  ([`b899eab`](https://github.com/gsinghjay/data-dashboard/commit/b899eab9189ef89a197fb0ad71d4c1545ca677a5))

### Refactoring

- **routes**: Integrate obesity data visualization page
  ([`0ab3624`](https://github.com/gsinghjay/data-dashboard/commit/0ab36249f0326e00a5a8dcd0c7e8fe0dd60a61ca))


## v1.0.0 (2025-02-14)

### Documentation

- **readme**: Enhance data visualization and analysis presentation feat: fix Mermaid diagram syntax
  and add comprehensive data sources
  ([`560064f`](https://github.com/gsinghjay/data-dashboard/commit/560064fc181242a3a7b79fa31cded921be39cf88))

### Features

- Add detailed statistical analysis, 15+ new visualizations, data sources, and methodology
  ([`48a1ebc`](https://github.com/gsinghjay/data-dashboard/commit/48a1ebc3e89043fc62d09a70d928a76e02af9088))

BREAKING CHANGE: restructure README with comprehensive food safety analysis

### Breaking Changes

- Restructure README with comprehensive food safety analysis


## v0.1.0 (2025-02-14)

### Chores

- Backup
  ([`c8bb5b3`](https://github.com/gsinghjay/data-dashboard/commit/c8bb5b388a382a892125d99c73c29b7e34103469))

### Documentation

- **data**: Update documentation and FSIS recall dataset
  ([`a684ae6`](https://github.com/gsinghjay/data-dashboard/commit/a684ae6fb1bc21f84b28b908328dcb162ff9948f))

- Add FSIS recalls data source information - Update processed FSIS recalls with enhanced data -
  Document data source record counts and coverage - Add links to data sources

### Features

- **docs**: Enhance food safety and obesity correlation analysis
  ([`c5e3c58`](https://github.com/gsinghjay/data-dashboard/commit/c5e3c58dfd036e13b0521794669944041d49ee77))

- Add comprehensive correlation analysis between food safety recalls and obesity rates - Include
  detailed statistical findings with correlation coefficients - Create new Mermaid diagrams for data
  visualization - Update executive summary with key findings - Add detailed methodology and data
  verification sections - Enhance geographic and temporal analysis - Include regulatory response
  patterns and health implications - Update data dictionary with new metrics and definitions

- **etl**: Enhance FSIS recall data fetching and processing
  ([`9dbfe2e`](https://github.com/gsinghjay/data-dashboard/commit/9dbfe2e3d9aee58a775cad6c98d2d069bc1e4fbb))

- Add comprehensive API filter mappings - Improve error handling and retries - Implement rate
  limiting and backoff strategy - Add detailed logging for better traceability - Update data
  processing for standardized output

- **verify**: Add CSV header analysis to verification script
  ([`b6bbe34`](https://github.com/gsinghjay/data-dashboard/commit/b6bbe349e01a5c5d82f86e44f24c13f70053aa1a))

- Add get_csv_headers method for all processed files - Improve report formatting and error handling
  - Update correlation analysis with better null handling - Fix column name references for FSIS
  recalls


## v0.0.0 (2025-02-14)
