//
export const CONST_CONFIG_PORT = 3001;

//
export const CONST_CONFIG_DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@tm-cluster.77ngt.mongodb.net/tm_bst_db?retryWrites=true&w=majority`;

//
export const CONST_CONFIG_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQC6wX2TOVQNNl+LyMIjRffE4r+nwDSDVvNgRuyZFg5rdp8BZyUw
lkP8R/BKubDJgTBXuBCcqRKUsg2ysdZosuarrG5kZVS6ZBe6HnAdKh2TTuyGC2TM
iz/cP/msOqvpgTmximDnQ503no74THFb/r0TN06Atuf0GGxFTE+Kk0zrFwIDAQAB
AoGBAI8jtJL98q05ypvCIQKWIyTVwp3ZlKZCI8HcOoXPQPge8BpMK1YFJlCb9tHf
Z1/a0+m324unjuVHX3ZiFfsje+YzjIy85L/6N4jYLcxWE2/3tro3uQNqCekDJ7LA
3EZ1GzwXsg/2dFN8xNK/ZbaGdA5LNrEztLBJI5AKu/3FAy3RAkEA46MxfEruFfbb
cc5giAk1hwRQ7/QOpg6GOGFR2xMQ+jZcavIClhjl3AJMCFuFLza3+AqoISDD1S3I
YJZeGgy+qQJBANIGUkWJU8ocwbUibg0xYVZilXf5vSajxYZDjbekrE2zKg2RvpwY
gRHiabxYEBVwrBx3bNV0KDn4JVJIwje3M78CQQCem1NcddzjwudtqU0LG9eG5pP6
TMN0IkSUvgJJsUQwAnZsMYlpyZlGrPcLD7GBjw+prMsuoeSxAUBPRBX28pBZAkEA
tpEqKSoj/PgcZqFkOvGm5FnUBjPAefs48+p7IZzy7qQEtUDxCW2/nNVNBp0idhC4
fBJQOAi+Aw4zGyEGOzp0rwJARw6ETEttzepcWQmAopIAn0Y40GKO7cG4fxHY1Okr
pUm9xDhGFbEbw+SIrfn0mI9hCScOi7hJfr2VHQYMekAZYQ==
-----END RSA PRIVATE KEY-----`;

//
export const CONST_CONFIG_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6wX2TOVQNNl+LyMIjRffE4r+n
wDSDVvNgRuyZFg5rdp8BZyUwlkP8R/BKubDJgTBXuBCcqRKUsg2ysdZosuarrG5k
ZVS6ZBe6HnAdKh2TTuyGC2TMiz/cP/msOqvpgTmximDnQ503no74THFb/r0TN06A
tuf0GGxFTE+Kk0zrFwIDAQAB
-----END PUBLIC KEY-----`;

//
export const CONST_MODEL_NAMES = {
  rights: "rights",
  roles: "roles",
  users: "users",
};
