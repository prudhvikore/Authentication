import React from "react"
import {screen,fireEvent,render, waitForElementToBeRemoved} from "@testing-library/react";
import LoginForm from "./login"
import { BrowserRouter } from "react-router-dom";

describe("Login Form",()=> {
    beforeEach(()=> {
        render(<BrowserRouter><LoginForm/></BrowserRouter>);
    });

    describe("tesing components in the LoginForm",()=> {
        it("should render a form",()=> {
            expect(screen.getByLabelText("heading")).toBeInTheDocument()
        })

        it("should render a login button",()=> {
            expect(screen.getByTestId("login-test").textContent).toBe("Login")
        })

        it("should render a register button",()=> {
            expect(screen.getByTestId("register-test").textContent).toBe("Register")
        })

        it("should have a two input feilds",()=> {
            expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
            expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
        })
    })

    describe("checking for input values",()=> {
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
    })
    
})




