const mailTemplate = (url) => {
    return `
        <!DOCTYPE>
            <html style="margin: 0; padding: 0;">
                <head>
                    <title>* School Point 이메일 인증 *</title>
                </head>
                <body style="margin: 0; padding: 0; font-size:15px;">
                    <div>School Point 가입을 환영합니다.
                    아래 버튼을 클릭하면, 이메일 인증이 완료됩니다!</div>
                    <button type="button" onClick=${url}> 이메일 확인 </button>
                </body>
            </html>
    `
} 

module.exports = { mailTemplate };