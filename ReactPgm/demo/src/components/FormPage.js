import { Router,Routes, Route } from "react-router-dom";
import Form from "./pages/Form";


export default function FormPage(){
    return(
        
          <Router>
        <Routes>
        <Route path="/form" element={<Form />} />

        </Routes>
        </Router>
    
    )
}