// Completed with help from: https://claude.ai/share/9b4da3ac-d6ee-4d56-a419-58509ed9340d

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {

    const [buds, setBuds] = useState([]);

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/s25/hw5/buds', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats);

                const hasInitialized = sessionStorage.getItem('initialized');
                
                if (!hasInitialized) {
                    // First-time initialization
                    let adoptableList = cats.map(cat => cat.id);
                    sessionStorage.setItem("adoptable", JSON.stringify(adoptableList));
                    sessionStorage.setItem("basket", JSON.stringify([]));
                    sessionStorage.setItem("adopted", JSON.stringify([]));
                    sessionStorage.setItem("initialized", "true");
                } else {
                    // On subsequent loads, preserve adopted and basket cats
                    const adoptedList = JSON.parse(sessionStorage.getItem("adopted") || "[]");
                    const basketList = JSON.parse(sessionStorage.getItem("basket") || "[]");
                    
                    // Filter out cats that are in adopted or basket from the adoptable list
                    let adoptableList = cats
                        .map(cat => cat.id)
                        .filter(id => !adoptedList.includes(id) && !basketList.includes(id));
                    
                    // Update the adoptable list
                    sessionStorage.setItem("adoptable", JSON.stringify(adoptableList));
                }
            })
    }, []);

    console.log("buds: ")
    console.log(buds)

    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            <BadgerBudsDataContext.Provider value={[buds, setBuds]}>
                <Outlet />
            </BadgerBudsDataContext.Provider>
        </div>
    </div>
}