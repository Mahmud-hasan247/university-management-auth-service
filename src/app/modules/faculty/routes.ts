import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { faculty_zod_validation } from './zodValidations';
import { faculty_controllers } from './controllers';

const router = express.Router();

router.patch(
  '/update_faculty/:id',
  request_validate(faculty_zod_validation?.update_schema),
  faculty_controllers?.faculty_update
);

router.get('/get_single_faculty/:id', faculty_controllers?.get_single_faculty);
router.delete('/delete_faculty/:id', faculty_controllers?.faculty_delete);

router.get('/get_faculties', faculty_controllers?.get_all_faculties);

export const faculty_routes = router;
