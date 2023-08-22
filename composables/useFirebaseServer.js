import {getApps, initializeApp, cert} from "firebase-admin/app";

const firebaseServerConfigs ={
    "type": "service_account",
    "project_id": "nuxt-md-project",
    "private_key_id": "e35f97fcbb97fa2d066ebbc594641c3638c87979",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbM5dgez+jsvqW\nC3G9C2OXAWDv/uZIlOXQc0Z/9ihNNvbio1UJKakTuqwEjD+xfOeVFZVCGqM7GqzX\nm0NRxFYYYliA5DaiuImUETxVjb9evoGBob7YP05O6btGSJLI5eQtAggdFjm/jGVR\n56Up7KmISCijzXEq+n5rou+oG0J5kwFAVsIk1wVHHGB1vYM75Fm1aVIoT1y6lgj2\nlMf9JfHek7LNlGzlZIqXosG4Qx8bOKmPKfmmP1rAPmQQUYy3fecxl9Gln3YO5SRy\n/BPvJAb0TkIOKFqpMjBU+M1im8OvVArZQ+1mXVD+fy22O/YLsl87avFnk4R9piR5\nFQRZKx2rAgMBAAECggEAIeWX/pkAjdlzC7noVEILHAJgEazawpWX9kSlPct8jvg1\ndHWqhDi3hzACQs/HV7SHgVPtmWPSIyUsXkkJv367i5jFs+TWmBIuYEHMETTSx51x\nHHE9OGaNvwFA7wzw+fUm9FjQlWLm+jqFPoWyUknhK4xxEGeIHQvQeeef5OCWRoNO\nU6Q+Iv8VzXPP2bddnIMjxtTLTFIWFIciHeudI54pdTmgZrj6XHfslVDB9VqqNhGH\nvdk66e5V/tNn64mBF4iNmoTxNj70oIgKfzWWunal9Wo65iX5bMh/sqpFBvTCEroM\nSMCLCkLI80jlu6APURAgLjFgj7DcCrIsR+a1ipO93QKBgQDwq189ev1UFu44CTHZ\nOMtikiGWt5rco6wL+OCNR1K6ZyXMMaj6RCDWGkeawSIasCvGdIn6/kYD81uR7IlL\nyNgjymEaURXGEfAyHbDhBYPzOYQiiwVWu430O4WUaLK5lMaZc788Bt4V4bu+Ac27\nVUUzGauSIFjEESXTy132Ny5enwKBgQDpKiO3dK8/U6FTCY7M/O18NaSCg20EL2LE\nN560ww3H2CYOtqkmbwo2HoU90rNZJdTGuigkEACDzCF1xvCqsih+h37D4TuzG6tG\nPcyvOsbnbyfUqBVFnG6ILdx269iEvhwMpq53R4eJRAwFbzKNsH3jdnGW5kuYKFf5\noT/XRdzBdQKBgEaR6bZsZvYOV0HlKFHKvpCjyueX5PgHoj5MdwPWQyLXdhTfBu6D\npaFCSXbOZQKwX9WsfH01rDAiXtp2IngvZ3lvMXP3DMxsnCMF48THyj46wk0iuKkL\nC//uqCexX57dSjLa5ttiJCMEcvmvK7Vfto/aWh3aEE1FvfLRsjatTZJ/AoGBAI5d\nE2e9UA9bccHwsQdKW3qeii7CLjsC78wcpcN64RwnRr1vHAKCg/qdUf94edcxuSQJ\nn969AoN2jOuLp4ChvQXclzLkf/4RI9eEfkhzm+TNQsWeRza0l+yAC/90a0RJi3jS\nAO6FdyUBrlFXHsfSflr3A83+GSPzZhveL8uyNWLNAoGBAO5aU+YwN+BDKS9h3mW3\ntZYnWvZ6W62XtUy4VQ/0zAD+skR77nhNZGzOnQFJmcz1UaQFuDsWczbnmaZqnIfH\nZ5OejwISM/mbPrSDUPM5hMKVTAULsMyrVwwF6bwS09RaGrLtoYL3sfmybTJYad82\nPvVyCpg9j5mcVwpr28XL4oJ0\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-o6z75@nuxt-md-project.iam.gserviceaccount.com",
    "client_id": "111483122775157483590",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o6z75%40nuxt-md-project.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
    export default function useFirebaseServer(){
        let app;
        if(getApps().length === 0)
        app = initializeApp({
                credential: cert(firebaseServerConfigs)
        })

        return {
            app
        }
    }


