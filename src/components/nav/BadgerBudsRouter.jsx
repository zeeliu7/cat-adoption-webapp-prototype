import { BrowserRouter, Route, Routes } from "react-router-dom";

import BadgerBuds from "../BadgerBuds";
import BadgerBudsLanding from "./pages/BadgerBudsLanding"

import AvailableCats from './pages//BadgerBudsAdoptable'
import Basket from './pages/BadgerBudsBasket'
import NoMatch from './pages/BadgerBudsNoMatch'

export default function BadgerBudsRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerBuds />}>
                <Route index element={<BadgerBudsLanding />} />
                <Route path="available-cats" element={<AvailableCats/>} />
                <Route path="basket" element={<Basket/>} />
                <Route path="*" element={<NoMatch/>} />
            </Route>
        </Routes>
    </BrowserRouter>
}