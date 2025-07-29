# Search Bar With API Call

A modern React + Vite application featuring a stylish, animated search bar with live suggestions and search results, powered by [MockAPI](https://mockapi.io/).

## Features

- **Animated Search Bar**: Beautiful UI with Tailwind CSS and smooth animations.
- **Live Suggestions**: Fetches and displays suggestions as you type, using a MockAPI endpoint.
- **Search Results**: Displays results with loading and error states.
- **Environment Config**: API endpoint managed via `.env` file for easy configuration.
- **Accessible**: Keyboard navigation for suggestions (arrow keys, Enter, Escape).

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Edit `basic_seach_bar/.env` and set your API endpoint:
     ```
     VITE_MOCK_API_CALL=https://your-mockapi-endpoint.io/resource
     ```

3. **Run the app:**
   ```sh
   npm run dev
   ```

4. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/App.jsx` - Main app logic, handles search and results.
- `src/SearchBar.jsx` - Search bar with live suggestions.
- `src/SearchResult.jsx` - Displays search results.
- `src/index.css` - Tailwind CSS and custom animations.

## Customization

- Change the color scheme in `App.jsx` and Tailwind classes.
- Update the API endpoint in `.env` as needed.

## License

MIT
