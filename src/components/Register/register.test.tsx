import React from "react"
import {screen,render,fireEvent} from "@testing-library/react";
import Register from "./register"
import { BrowserRouter } from "react-router-dom";

describe("Login Form",()=> {
    beforeEach(()=> {
        render(<BrowserRouter><Register/></BrowserRouter>);
    });

    describe("tesing components in the Register",()=> {
        it("should render a form",()=> {
            expect(screen.getByLabelText("h3")).toBeInTheDocument()
        })

        it("should render a register button",()=> {
            expect(screen.getByTestId("register").textContent).toBe("Register")
        })

        it("should have a three input feilds",()=> {
            expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
        })
    })
    describe("testing validation of component",()=> {
        it("should contain atleast 8 chars",()=> {
            const password:any=screen.getByPlaceholderText("Password")
            fireEvent.change(password,{target:{value:"qwertyuio"}})
            expect(password.value.length).toBeGreaterThan(8)
        })
    })

    describe("checking for the input values",()=>{
        it("should have username value", () => {
            const username_input:HTMLInputElement=screen.getByPlaceholderText("Username")
            fireEvent.change(username_input,{target:{value:"prudhvi"}})
            expect(username_input.value).toBe("prudhvi")
        })
        it("should have password value", () => {
            const password_input:HTMLInputElement=screen.getByPlaceholderText("Password")
            fireEvent.change(password_input,{target:{value:"prudhvi0721"}})
            expect(password_input.value).toBe("prudhvi0721")
        })
        it("should have email value", () => {
            const email_input:HTMLInputElement=screen.getByPlaceholderText("Email")
            fireEvent.change(email_input,{target:{value:"prudhvi@gmail.com"}})
            expect(email_input.value).toBe("prudhvi@gmail.com")
        })
    })
})




