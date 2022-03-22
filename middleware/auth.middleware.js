const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
const auth = async (req, res, next) => {

    //req.headers.authorization
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbWlsQGdtYWlsLmNvbSIsInVzZXJfaWQiOiIxOTI5MGI4Ny02YTczLTRkN2QtOTY4ZC1jZWRhMWVmOTg0M2YiLCJpYXQiOjE2NDczMjcwNjYsImV4cCI6MTY0NzMzMDY2Nn0.3KIPgpBir030ZLmqqj11GTAESPFe1OyQvbJ16js-68M
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // to split only tokens
            token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;
            let decodedData;

            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, secret);
                console.log(decodedData);
                req.email = decodedData?.email;
                // {
                // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbWlsQGdtYWlsLmNvbSIsInVzZXJfaWQiOiIxOTI5MGI4Ny02YTczLTRkN2QtOTY4ZC1jZWRhMWVmOTg0M2YiLCJpYXQiOjE2NDczMjcwNjYsImV4cCI6MTY0NzMzMDY2Nn0.3KIPgpBir030ZLmqqj11GTAESPFe1OyQvbJ16js-68M
                //     "email": "tamil@gmail.com",
                //     "user_id": "19290b87-6a73-4d7d-968d-ceda1ef9843f",
                //     "iat": 1647327066,
                //     "exp": 1647330666
                // }
            } else {
                decodedData = jwt.decode(token);
                req.email = decodedData?.email;
                // {
                // eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2M2RiZTczYWFkODhjODU0ZGUwZDhkNmMwMTRjMzZkYzI1YzQyOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTc5OTA0MDU3Njc4LWZtcXFhajU5bmJmOTNnbHVpM2Myc2NhYTN1YWoxN2FhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTc5OTA0MDU3Njc4LWZtcXFhajU5bmJmOTNnbHVpM2Myc2NhYTN1YWoxN2FhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyOTcwMjE5Mjc1Nzg1MTc4MDQ5IiwiZW1haWwiOiJtb2hhbW9oYW4yMDAxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQWV2UUVuWU4xeURCY01hRU95U0dkQSIsIm5hbWUiOiJNb2hhbiBQIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqNTZXU0p6elcxWUhDMjVrMk9NWERCaGhNNnp3X29sUHJFTzNVWT1zOTYtYyIsImdpdmVuX25hbWUiOiJNb2hhbiIsImZhbWlseV9uYW1lIjoiUCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjQ3MzI3MzQyLCJleHAiOjE2NDczMzA5NDIsImp0aSI6IjNhMWYyODZjNDdmZjczNDg2OWVlYmVhZjlhZjVlNmRjYzc4NjhlODQifQ.L5ZSinJT99AMITFzr_aeTJcHx60SnRT1ZuNhLWKow4BHqA-wuO8XMOARGk8CjZE1ZCrXJokvaBBTInbwwPHm2ri02kMEBfLUfuEIhqLg6UtteSwkIXarVuIUnixLeLL8nAZayKPpvfMqqT2TnnncB0u41q0G5ZlbnKnWV7o4Jg_ttNPZEawar2DThjrOVHhBH_kujNX4Dw5K72-Ya9N4m0hEOdPK61Lo5dkIbWt-ivBQvz2bxh-NTQfpQ6ZQnz_ECFphR6Z0voLDer75s_pGkalr-Wtzi-EFVFQRhDSJb7e4VU3Zy-KGXS0btlXerjWi5AA5RIIMwZas7jFPlFAw1Q
                //     "iss": "accounts.google.com",
                //     "azp": "979904057678-fmqqaj59nbf93glui3c2scaa3uaj17aa.apps.googleusercontent.com",
                //     "aud": "979904057678-fmqqaj59nbf93glui3c2scaa3uaj17aa.apps.googleusercontent.com",
                //     "sub": "112970219275785178049",
                //     "email": "mohamohan2001@gmail.com",
                //     "email_verified": true,
                //     "at_hash": "AevQEnYN1yDBcMaEOySGdA",
                //     "name": "Mohan P",
                //     "picture": "https://lh3.googleusercontent.com/a-/AOh14Gj56WSJzzW1YHC25k2OMXDBhhM6zw_olPrEO3UY=s96-c",
                //     "given_name": "Mohan",
                //     "family_name": "P",
                //     "locale": "en",
                //     "iat": 1647327342,
                //     "exp": 1647330942,
                //     "jti": "3a1f286c47ff734869eebeaf9af5e6dcc7868e84"
                // }
            }
            next();
        } catch (error) {
            res.status(401).json({ message: "Not Authorised or no token" })
        }
    }
    if (!token) {
        res.status(401).send("Not Authorised or no token")
    }
};

module.exports = auth;

