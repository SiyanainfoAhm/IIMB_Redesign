import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CompareProvider } from "./context/CompareContext";
import { SavedEventsProvider } from "./context/SavedEventsContext";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <CompareProvider>
          <SavedEventsProvider>
            <AppRoutes />
          </SavedEventsProvider>
        </CompareProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
