from app_backend import app, socketio

if __name__ == "__main__":
    if app.config['WEBHOOK_VERIFY_TOKEN'] is None:
        print('WEBHOOK_VERIFY_TOKEN has not been set in the environment.\nGenerating random token...')
        token = temp_token()
        print('Token: %s' % token)
        app.config['WEBHOOK_VERIFY_TOKEN'] = token

    socketio.run(app, debug=True)
