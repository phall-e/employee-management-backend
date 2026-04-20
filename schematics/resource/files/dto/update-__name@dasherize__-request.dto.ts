import { PartialType } from '@nestjs/mapped-types';
import { Create<%= classify(name) %>RequestDto } from './create-<%= dasherize(name) %>-request.dto';

export class Update<%= classify(name) %>RequestDto extends PartialType(Create<%= classify(name) %>RequestDto) {}
