import {screen,render,fireEvent} from "@testing-library/react";
import ForgotPassword from "./ForgotPassword";
import React from "react"
import { BrowserRouter } from "react-router-dom";




describe("forgot password",()=>{


    beforeEach(()=>{
        render(<BrowserRouter><ForgotPassword/></BrowserRouter>)
    })


    it("should have username value",()=>{
        const inp:HTMLInputElement = screen.getByTestId("username");
        fireEvent.change(inp,{target:{value:"naga"}});
        expect(inp).toHaveValue("naga")
    })
    it("should have password value", () => {
        const password_input:HTMLInputElement=screen.getByPlaceholderText("New Password")
        fireEvent.change(password_input,{target:{value:"prudhvi0721"}})
        expect(password_input.value).toBe("prudhvi0721")
    })
    it("should contain confirm password field",()=>{
        const cpass:HTMLInputElement=screen.getByPlaceholderText("Confirm Password")
        fireEvent.change(cpass,{target:{value:"prudhvi0721"}})
        expect(cpass.value).toBe("prudhvi0721")
    })
    it("should render a heading",()=> {
        expect(screen.getByLabelText("heading").textContent).toBe("Password Reset")
    })
    it("should render a reset button",()=> {
        expect(screen.getByTestId("reset-test").textContent).toBe("Reset")
    })
    it("should render a reset button",()=> {
        expect(screen.getByAltText("website login")).toBeInTheDocument()
    })


})