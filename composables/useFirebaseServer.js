import {getApps, initializeApp, cert} from "firebase-admin/app";
    const config = useRuntimeConfig()

    const firebaseServerConfigs = {
        "type": "service_account",
        "project_id": "nuxt-md-project",
        "private_key_id": "1163cdef2e8cc30a7278c8aa82acc0793a27b42d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCm6hUN5krWjZzi\nTVrCYNx0ztTd5bzbE3O/8vCl2CC8OVLm/VcUx/KcFhr+YhnVwUWXKX83pVswGrPf\nwEYW2Y18Ur7lDkfe6m/WSn2MelOWjNXsjkUQogHhzV8hrH3m1TBbLQc999sfL7Dx\ncE1ZV80R5D+Wmbl6H6sHQ/ghotKug4/0rlGLWMNTaI3zZzZMqCTTubNzoJNram3k\nPV65TLPm8DekXoSALGFyy35bxECWfkuyMoXssP+xo/NHMKMm3r4j58E1sPfUQAu8\n289xReD2wjN4j9QIbXr0mlqAGNLWA/SjOtPbUG5C/rehlX6VpSQshVN593daW5qU\nbx2NZ6tVAgMBAAECggEADSPhzcWoH+/naTa8bbpWYKkPv6WgZ9bGMVbyHvw+x31J\nINTSOtlAKOLh884hSTSn7S3fzVpVLW+iDXwDiIpOmyT10O5+NfcFdZHzrvrKWHsf\nNDpBsaeEt76v6I9ocfhX5Yr2m6hG4H5OqGiLjlGyhoq41CWnS7fxLOdAQir2pF+n\ntxNtbHkaZdKa80EECm0LVM/xJPGKI45MBROCCeNo1twIK+j4qqDblyEcO1bWHHIa\n6qrqdY5xEwdE0iR2pQUfrhKyImLXeGSyWfhPrwmgaTyJOesD1FtYXasHQMYIE+iO\nMqKqeifCMJnIOwvbZ1yfACG13IWJNs6c2UzuB7ir2QKBgQDkHigTOK0/JgOP15UA\n6vSsO8p53YqB+ClLVA5l70i+vtrNOJfJn3PkP46gwTsB+A/kIxCw24B5sm8ZMlRP\nflM3+XfU3E4VsG1P5+l7WpY8ICDuOKH+nhyxz//hHPTPjHW+t8mY1Q+ZN6fRofer\nzCk8f3C7aTQyTGI4ULRzZG99JwKBgQC7UNxbXxTlhD5qv269wwhMVzORmWStQ90G\nehwpHV6O/qAQz/MX+4nWJpmNXUDlAoSqVzySDu20iFX4vfbIwFcodYqbnYObFzYy\n8zbaSkpy6YEYNNXlltCiUulKD41LeBmAfL/e7JrsP4G6U29TI9rsb2sporR/F3GC\n831vaYFZIwKBgEYLCG0WewOnzXIuVL8qZaQ426vdnXjY1P0fOyiLd3+yJIbc+KZd\nAn20EjxD+LVbEK4RIj/btjAn3LsU3BRoim7md6fxWTyJppbhc6x/nR+rEdFzrDH9\nJHxojH33oSfVThYYYps92ININoxEukKS9ppv2xKAdBl5oLL//Nhtn1oDAoGAOcib\nAZDWSGtAOfvt9JoKoEoyPVMdjJmnwEzBDSnjNqdzx1vu+NH+1lI4AjTnRP4+4LFi\nnQf/6jY4lzA6xfkXqgKAjLrNk3VYoeUHYdWTG9nOmiIKbfXVTI3ZK6CajNJyw4E4\nS1OgAwsgQNNmPzaLXW6Nl1164s3flW75nfnlDhMCgYAKfb4hSpMWGSwIrIK+YH7o\nmmLUE1KFpT6hnSOOeZAzDbPa6Nvt8VMsmdd/P0y/ip1tMrLfuyS18vgpVs15Ve53\n/V3tNLEjdHooEGuGCmSOKDq/5ejpjHR2cHyO/M7y8jvJqwPT8VpXCdBf7V2SABrZ\nwENz79F1ha9tfVQUSj/q3g==\n-----END PRIVATE KEY-----\n",
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


