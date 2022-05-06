import { render } from "@testing-library/react"
import Landing from "../components/Landing"

describe("'Landing' component tests:", () => {
    test("It renders correctly:", () => {
        const {container} =  render(<Landing/>);
        expect(container).toMatchSnapshot();
    })
})