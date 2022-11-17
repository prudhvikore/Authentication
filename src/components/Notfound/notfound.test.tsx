import { screen, render } from "@testing-library/react";
import React from "react";
import NotFound from "./notfound";
import { BrowserRouter } from "react-router-dom";


test("Home",()=>{
    render(<BrowserRouter><NotFound/></BrowserRouter>)
    expect(screen.getByAltText("not found")).toBeInTheDocument()
})