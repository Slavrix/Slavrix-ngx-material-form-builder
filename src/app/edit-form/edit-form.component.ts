import {
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { field, section, value } from '../global.model';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  title = 'ngx-custom-form-builder';

  value: value = {
    label: '',
    value: '',
  };

  section: section = {
    name: '',
    description: '',
    id: '',
    attributes: [],
  };

  success = false;
  opened = true;
  showJson = false;
  showForm = false;

  fieldModels: Array<field> = [
    {
      type: 'text',
      icon: 'text_fields',
      label: 'Text',
      description: '',
      placeholder: '',
      regex: '',
      required: false,
      validation: false,
    },
    {
      type: 'email',
      icon: 'alternate_email',
      required: true,
      label: 'Email',
      description: 'Enter a valid email address',
      placeholder: '',
      errorText: 'Please enter a valid email',
      validation: true,
    },
    {
      type: 'phone',
      icon: 'phone',
      label: 'Phone',
      description: 'Enter your phone number including country code',
      placeholder: '',
      errorText: 'Please enter a valid phone number',
      required: false,
      validation: false,
    },
    {
      type: 'number',
      label: 'Number',
      icon: 'dialpad',
      description: '',
      placeholder: '',
      min: 0,
      max: 100,
      required: false,
      validation: false,
    },
    {
      type: 'date',
      icon: 'calendar_month',
      label: 'Date',
      placeholder: '',
      required: false,
      validation: false,
    },
    {
      type: 'time',
      icon: 'schedule',
      label: 'Time',
      placeholder: '',
      required: false,
      validation: false,
    },
    {
      type: 'datetime',
      icon: 'calendar_month',
      label: 'DateTime',
      placeholder: '',
      required: false,
      validation: false,
    },
    {
      type: 'textarea',
      icon: 'notes',
      label: 'Textarea',
      required: false,
      validation: false,
    },
    {
      type: 'paragraph',
      icon: 'short_text',
      label: 'Paragraph',
      placeholder: 'Type your text to display here only',
      required: false,
      validation: false,
    },
    {
      type: 'checkbox',
      required: true,
      validation: false,
      label: 'Checkbox',
      icon: 'check_box',
      description: 'heckbox',
      inline: true,
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
    {
      type: 'radio',
      icon: 'radio_button_checked',
      label: 'Radio',
      description: '',
      required: false,
      validation: false,
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
      ],
    },
    {
      type: 'select',
      icon: 'list',
      label: 'Select',
      description: '',
      placeholder: '',
      required: false,
      validation: false,
      values: [
        {
          label: 'Option 1',
          value: 'option-1',
        },
        {
          label: 'Option 2',
          value: 'option-2',
        },
        {
          label: 'Option 3',
          value: 'option-3',
        },
      ],
    },
    {
      type: 'file',
      icon: 'file_upload',
      label: 'File Upload',
      required: false,
      validation: false,
    },
    {
      type: 'rating',
      icon: 'star',
      label: 'Rating',
      required: false,
      validation: false,
      max: 5,
    },
  ];

  modelFields: Array<field> = [];

  model: any = {
    name: '',
    description: '',
    theme: {
      // bgColor:"ffffff",
      // textColor:"555555",
      // bannerImage:""
    },
    sections: [
      {
        name: '',
        description: '',
        id: '',
        attributes: [],
      },
      {
        name: '',
        description: '',
        id: '',
        attributes: [],
      },
    ],
  };

  constructor() {}

  ngOnInit() {}

  onDragStart(event: any) {
    console.log('drag started', event);
  }

  onDragEnd(event: any) {
    console.log('drag ended', event);
  }

  onDragged(event: any) {
    console.log('dragged', event);
  }

  onDrop(event: any) {
    console.log('dropped', event);
    if (event.previousContainer !== event.container) {
      if (event.previousContainer.id == 'list-select') {
        const clone = cloneDeep(event.item.data);

        // Add the clone to the new array.
        event.container.data.splice(event.currentIndex, 0, clone);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (event.previousContainer.data) {
      this.fieldModels = this.fieldModels.filter((f: any) => !f.temp);
    }
  }

  addValue(values: any) {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }

  updateForm() {
    let input = new FormData();
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));
  }

  toggleValue(item: any) {
    item.selected = !item.selected;
  }

  connectSections() {
    let arr: string[] = [];

    for (let i = 0; i < this.model.sections.length; i++) {
      arr.push('list-' + i);
    }
    return arr;
  }

  removeField(j: number, i: number) {
    this.model.sections[j].attributes.splice(i, 1);
  }

  addSection() {
    this.model.sections.push(this.section);
  }

  removeSection(j: number) {
    this.model.sections.splice(j, 1);
  }

  exited(event: any) {
    console.log('exited', event);
    const currentIdx = this.fieldModels.findIndex(
      (f: any) => f.type === event.item.data.type
    );
    this.fieldModels.splice(currentIdx + 1, 0, {
      ...event.item.data,
      temp: true,
    });
  }
  entered(event: any) {
    console.log('entered', event);
    this.fieldModels = this.fieldModels.filter((f: any) => !f.temp);
  }
}
