'use client';
import '../create.css';
import { useState, useEffect } from 'react';
import { SlideButtonR } from '@components/SlideButton';

import activities from '@curriculum/activities.json';

interface ActivityData {
  name: string;
  topic: string;
  properties: {
    [key: string]: {
      label: string;
      type: string;
      attributes: {
        [key: string]: any;
      };
    };
  };
}

const activitiesData: { [key: string]: ActivityData } = activities;

interface Props {
  params: {
    activity: string;
  };
}

interface FormData {
  [key: string]: any;
}

interface TitleProperty {
  title: {
    label: string;
    type: string;
    attributes: {
      default: string;
    };
  };
}

type PropertyData = TitleProperty & {
  [key: string]: {
    label: string;
    type: string;
    attributes: {
      default?: any;
      min?: number;
      max?: number;
      options?: { [key: string]: string };
    };
  };
};

interface PropertyProps {
  id: string;
  updateData: (id: string, data: any) => void;
  data: {
    type: string;
    attributes?: {
      [key: string]: any;
    };
  };
  disabled?: boolean;
  multikey?: string;
}

interface CheckboxPropertyProps extends PropertyProps {
  data: {
    type: 'selectMultiple';
    label: string;
    attributes: {
      default: string[];
      options: { [key: string]: string };
    };
  };
}

interface LabelPropertyProps extends PropertyProps {
  data: {
    type: 'label';
    label: string;
  };
}

interface NumberPropertyProps extends PropertyProps {
  data: {
    type: 'number';
    label: string;
    attributes: {
      default?: number;
      min?: number;
      max?: number;
    };
  };
}

interface StringPropertyProps extends PropertyProps {
  data: {
    type: 'string';
    label: string;
    attributes: {
      default?: string;
    };
  };
}

interface RangePropertyProps extends PropertyProps {
  data: {
    type: 'range';
    label: string;
    attributes: {
      defaultmin?: number;
      defaultmax?: number;
    };
  };
}

interface MultiPropertyProps extends PropertyProps {
  data: {
    type: 'multi';
    label: string;
    attributes: {
      default: string;
      options: { [key: string]: any };
    };
  };
}

export default function Activity({ params }: Props): JSX.Element {
  const activity: string = params.activity;
  if (!Object.keys(activitiesData).includes(activity)) {
    return <h1>Not found</h1>;
  }

  const formData: FormData = {};
  const updateFormData = (id: string, data: any) => {
    formData[id] = data;
  };

  const title: TitleProperty = {
    title: {
      label: 'Activity Title',
      type: 'string',
      attributes: {
        default: activitiesData[activity]['name'],
      },
    },
  };

  const properties = Object.keys(Object.assign({}, title, activitiesData[activity]['properties'])).map((property) => (
    <div key={property} className="property">
      <Property id={property} updateData={updateFormData} data={activitiesData[activity]['properties'][property] ?? title[property as keyof typeof title]} />
    </div>
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };
    fetch('https://qauinger.com/brainwave/api', requestOptions)
    .then(response => {
      console.log(response);
        var data = response.json();
        console.log(data)
        // data.then((response) => {
        //     navigate(`/share/${response['uuid']}`);
        // })
    });
  };

  return (
    <div className="indent">
      <h2>{activitiesData[activity]['name']}</h2>
      <form id="form">
        {properties}
        <span onClick={handleSubmit}>
          <SlideButtonR title="Create activity" />
        </span>
      </form>
    </div>
  );
}

function Property(props: PropertyProps): JSX.Element {
  switch (props.data.type) {
    case 'label':
      return <LabelProperty id={props.id} updateData={props.updateData} data={props.data as LabelPropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    case 'number':
      return <NumberProperty id={props.id} updateData={props.updateData} data={props.data as NumberPropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    case 'string':
      return <StringProperty id={props.id} updateData={props.updateData} data={props.data as StringPropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    case 'range':
      return <RangeProperty id={props.id} updateData={props.updateData} data={props.data as RangePropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    case 'selectMultiple':
      return <CheckboxProperty id={props.id} updateData={props.updateData} data={props.data as CheckboxPropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    case 'multi':
      return <MultiProperty id={props.id} updateData={props.updateData} data={props.data as MultiPropertyProps['data']} disabled={props.disabled} multikey={props.multikey} />;
    default:
      return <label>Error</label>;
  }
}

function LabelProperty(props: LabelPropertyProps): JSX.Element {
  return (
    <div>
      <label htmlFor={props.id} className={props.disabled ? 'disabled-label' : ''}>
        {props.data.label}
      </label>
    </div>
  );
}

function NumberProperty(props: NumberPropertyProps): JSX.Element {
  const [value, setValue] = useState(props.data.attributes.default);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  useEffect(() => {
    props.updateData(props.multikey ?? props.id, Number(value));
  }, [value]);

  return (
    <div>
      <label htmlFor={props.id} className={props.disabled ? 'disabled-label' : ''}>
        {props.data.label}:
      </label>
      <input
        type="number"
        id={props.id}
        value={value}
        onChange={handleChange}
        min={props.data.attributes.min}
        max={props.data.attributes.max}
        disabled={props.disabled}
      />
    </div>
  );
}

function StringProperty(props: StringPropertyProps): JSX.Element {
  const [value, setValue] = useState(props.data.attributes.default);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    props.updateData(props.multikey ?? props.id, value);
  }, [value]);

  return (
    <div>
      <label htmlFor={props.id} className={props.disabled ? 'disabled-label' : ''}>
        {props.data.label}:
      </label>
      <input type="text" id={props.id} value={value} onChange={handleChange} disabled={props.disabled} />
    </div>
  );
}

function CheckboxProperty(props: CheckboxPropertyProps): JSX.Element {
  const [selected, setSelected] = useState(new Set(props.data.attributes.default));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selected.has(String(e.target.id).substring(String(props.id).length + 1))
      ? selected.delete(String(e.target.id).substring(String(props.id).length + 1))
      : selected.add(String(e.target.id).substring(String(props.id).length + 1));
    setSelected(new Set(selected));
  };

  useEffect(() => {
    props.updateData(props.multikey ?? props.id, Array.from(selected));
  }, [selected]);

  return (
    <div>
      <label className={props.disabled ? 'disabled-label' : ''}>{props.data.label}:</label>
      {Object.keys(props.data.attributes.options).map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={props.id + '-' + option}
            checked={selected.has(option)}
            onChange={handleChange}
            disabled={props.disabled}
          />
          <label htmlFor={props.id + '-' + option} className={props.disabled ? 'disabled-label' : ''}>
            {props.data.attributes.options[option]}
          </label>
        </div>
      ))}
    </div>
  );
}

function RangeProperty(props: RangePropertyProps): JSX.Element {
  const [min, setMin] = useState(props.data.attributes.defaultmin);
  const [max, setMax] = useState(props.data.attributes.defaultmax);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(e.target.value));
  };

  useEffect(() => {
    props.updateData(props.multikey ?? props.id, { min: Number(min), max: Number(max) });
  }, [min, max]);

  return (
    <div>
      <label htmlFor={props.id} className={props.disabled ? 'disabled-label' : ''}>
        {props.data.label}:
      </label>
      <label htmlFor={props.id + '-min'} className={props.disabled ? 'disabled-label' : ''}>
        From
      </label>
      <input
        type="number"
        id={props.id + '-min'}
        value={min}
        onChange={handleMinChange}
        disabled={props.disabled}
      />
      <label htmlFor={props.id + '-max'} className={props.disabled ? 'disabled-label' : ''}>
        to
      </label>
      <input
        type="number"
        id={props.id + '-max'}
        value={max}
        onChange={handleMaxChange}
        disabled={props.disabled}
      />
    </div>
  );
}

function MultiProperty(props: MultiPropertyProps): JSX.Element {
  const [selected, setSelected] = useState(props.data.attributes.default);
  const [data, setData] = useState(new Map());

  const updateData = (id: string, d: any) => {
    var bop = data.set(id, d);
    setData(new Map(bop));
    var toUpdate = new Map();
    toUpdate.set(selected, bop.get(selected));
    props.updateData(props.id, toUpdate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
    setSelected(option);
  };

  useEffect(() => {
    var bop: { [key: string]: any } = {};
    bop[selected] = data.get(selected);
    props.updateData(props.id, bop);
  }, [selected, data]);

  return (
    <div>
      <label>{props.data.label}:</label>
      {Object.keys(props.data.attributes.options).map((option) => (
        <div key={option} className="inline">
          <input
            type="radio"
            id={props.id + '-' + option}
            checked={selected === option ? true : false}
            onChange={(e) => handleChange(e, option)}
          />
          <Property id={props.id + '-' + option} multikey={option} updateData={updateData} data={props.data.attributes.options[option]} disabled={selected === option ? false : true} />
        </div>
      ))}
    </div>
  );
}
