import { create } from "react-test-renderer"
import DescriptionStatus from "./DescriptionStatus"


describe("DesriptionStatus", () => {
    test('status should be correct', () => {
        const component = create( <DescriptionStatus status={'samurai'} /> )
        const instanse = component.getInstance()
        expect(instanse.state.status).toBe('samurai')
    }),
    test('span should exist', () => {
        const component = create( <DescriptionStatus status={'samurai'} /> )
        const instanse = component.root
        const span = instanse.findByType("span")
        expect(span).not.toBeNull()
    })
    test('span should not exist', () => {
        const component = create( <DescriptionStatus status={'samurai'} /> )
        const instanse = component.root
        expect( () => {
            const input = instanse.findByType("input")
        }).toThrow()
    })
    test('the input should appear', () => {
        const component = create( <DescriptionStatus status={'samurai'} /> )
        const instanse = component.root
        const span = instanse.findByType("span")
        span.props.onDoubleClick()
        const input = instanse.findByType("input")
        expect(input.props.value).toBe('samurai')
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create( <DescriptionStatus updateStatus={mockCallback} /> )
        const instanse = component.root.instance
        instanse.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)

    })
} )