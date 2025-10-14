import React from 'react';

export const Newsletter = ({ onValidated, status, message }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email,
    });
  }

  return (
    <div>
      {status === "sending" && <div>Sending...</div>}
      {status === "error" && <div dangerouslySetInnerHTML={{ __html: message }} />}
      {status === "success" && <div dangerouslySetInnerHTML={{ __html: message }} />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};