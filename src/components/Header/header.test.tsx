import React from "react"
import {screen,fireEvent,render, waitForElementToBeRemoved} from "@testing-library/react";
import Header from "./header"
import { BrowserRouter } from "react-router-dom";

describe("Login Form",()=> {
    beforeEach(()=> {
        render(<BrowserRouter><Header/></BrowserRouter>);
    })



    describe("checking for the components in the Home",()=> {

        it("should reder a logout icon",()=> {
            expect(screen.getByAltText("nav logout")).toBeInTheDocument()
        })

        it("should render website logo",() => {
            expect(screen.getByAltText("website logo")).toBeInTheDocument()
        })

        it("should render website logo",() => {
            expect(screen.getByAltText("website logo mobile")).toBeInTheDocument()
        })

        
        
    })

})