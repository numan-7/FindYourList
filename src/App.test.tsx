// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render } from "@testing-library/react"
import App from "./App"
describe('', () => {
  it('should simply return true', () => {
    expect(true).toBe(true);
  });
});

describe('', () => {
  it('should simply return false', () => {
    expect(false).toBe(false);
  });
});

test("renders the main page", () => {
  render(<App />)
  expect(true).toBeTruthy()
})