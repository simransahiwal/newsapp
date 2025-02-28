import React, { useState } from 'react';
const Auth = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? `${process.env.REACT_APP_BACKEND_URL}/auth/login` : `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
        const data = { email, password, ...(isLogin ? {} : { name }) };

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        const result = await res.json();
        if (res.status === 200) {
            setToken(result.token);  // Save the token in localStorage or state
        } else {
            alert(result.msg);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
