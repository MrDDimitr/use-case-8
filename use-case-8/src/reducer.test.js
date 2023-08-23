import reducer, { 
    setFirstName, 
    setLastName, 
    setEmail, 
    setMessage, 
    addUser, 
    resetForm 
} from './reducer';

describe('userSlice reducer', () => {
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            currentUser: {
                firstName: "",
                lastName: "",
                email: "",
                message: ""
            },
            users: []
        });
    });

    it('should handle setFirstName', () => {
        expect(
            reducer({ currentUser: { firstName: "" } }, {
                type: setFirstName.type,
                payload: "John"
            })
        ).toEqual({ currentUser: { firstName: "John" } });
    });

    it('should handle setLastName', () => {
        expect(
            reducer({ currentUser: { lastName: "" } }, {
                type: setLastName.type,
                payload: "Doe"
            })
        ).toEqual({ currentUser: { lastName: "Doe" } });
    });

    it('should handle setEmail', () => {
        expect(
            reducer({ currentUser: { email: "" } }, {
                type: setEmail.type,
                payload: "john@example.com"
            })
        ).toEqual({ currentUser: { email: "john@example.com" } });
    });

    it('should handle setMessage', () => {
        expect(
            reducer({ currentUser: { message: "" } }, {
                type: setMessage.type,
                payload: "Hello, World!"
            })
        ).toEqual({ currentUser: { message: "Hello, World!" } });
    });
    
    it('should handle addUser', () => {
        const initialState = {
            currentUser: {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                message: "Hi there"
            },
            users: []
        };

        expect(
            reducer(initialState, {
                type: addUser.type
            })
        ).toEqual({
            currentUser: {
                firstName: "",
                lastName: "",
                email: "",
                message: ""
            },
            users: [initialState.currentUser]
        });
    });

    it('should handle resetForm', () => {
        const initialState = {
            currentUser: {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                message: "Hi there"
            },
            users: []
        };

        expect(
            reducer(initialState, {
                type: resetForm.type
            })
        ).toEqual({
            currentUser: {
                firstName: "",
                lastName: "",
                email: "",
                message: ""
            },
            users: [] // users array remains unchanged
        });
    });
});
