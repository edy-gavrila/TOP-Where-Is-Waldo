import { render } from "@testing-library/react";
import Header from "../components/Header";
import headerLogo from "../assets/img/header-logo.png";

describe("'Header' component tests:", () => {
  test("It renders correctly:", () => {
    const { container } = render(
      <Header icon={headerLogo} title="Where's that thing?" />
    );
    expect(container).toMatchSnapshot();
  });
});
