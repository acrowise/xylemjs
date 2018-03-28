let self;

export default class UserController {
    constructor(express, userService, constants, helpersUtil) {
        self = this;
        self.expressRouter = new express.Router();
        self.userService = userService;
        self.constants = constants;
        self.helpersUtil = helpersUtil;
        
        self.expressRouter.post('', self.createUser);

        self.expressRouter.put('/:id', self.updateUser);

        self.expressRouter.get('/:id', self.findUser);

        self.expressRouter.delete('/:id', self.removeUser);

        return self.expressRouter;
    }

    createUser(req, res, next) {
        let user = {
          firstName: self.helpersUtil.fromModelVal(req.body.firstName),
          lastName: self.helpersUtil.fromModelVal(req.body.lastName),
          userName: self.helpersUtil.fromModelVal(req.body.userName),
          password: self.helpersUtil.fromModelVal(req.body.password)
        };
        self.userService.insertUser(user)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    findUser(req, res, next) {
        self.userService.findUser(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    updateUser(req, res, next) {
        self.userService.updateUser(req.params.id, req.body)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    removeUser(req, res, next) {
        self.userService.removeUser(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }
}