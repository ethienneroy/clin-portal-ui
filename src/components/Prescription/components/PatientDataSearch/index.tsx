import { useEffect, useState } from 'react';
import { Form, FormInstance, Input, Radio } from 'antd';
import { PrescriptionFormApi } from 'api/form';
import { IFormPatient } from 'api/form/models';
import { isEmpty } from 'lodash';
import { FieldData } from 'rc-field-form/lib/interface';

import { defaultFormItemsRules } from 'components/Prescription/Analysis/AnalysisForm/ReusableSteps/constant';
import {
  getNamePath,
  resetFieldError,
  setFieldError,
  setFieldValue,
  setInitialValues,
} from 'components/Prescription/utils/form';
import { formatRamq, isRamqValid } from 'components/Prescription/utils/ramq';
import { IAnalysisFormPart, IGetNamePathParams } from 'components/Prescription/utils/type';
import InputDateFormItem from 'components/uiKit/form/InputDateFormItem';
import RadioGroupSex from 'components/uiKit/form/RadioGroupSex';
import SearchOrNoneFormItem from 'components/uiKit/form/SearchOrNoneFormItem';
import { usePrescriptionFormConfig } from 'store/prescription';
import { SexValue } from 'utils/commonTypes';

import styles from './index.module.scss';

type OwnProps = IAnalysisFormPart & {
  onRamqSearchStateChange?: (done: boolean) => void;
  onFileSearchStateChange?: (done: boolean) => void;
  onResetRamq?: () => void;
  initialFileSearchDone?: boolean;
  initialRamqSearchDone?: boolean;
  initialData?: IPatientDataType;
};

export enum PATIENT_DATA_FI_KEY {
  PRESCRIBING_INSTITUTION = 'ep',
  FILE_NUMBER = 'mrn',
  NO_FILE = 'no_mrn',
  RAMQ_NUMBER = 'ramq',
  NO_RAMQ = 'no_ramq',
  LAST_NAME = 'last_name',
  FIRST_NAME = 'first_name',
  BIRTH_DATE = 'birth_date',
  SEX = 'gender',
}

export interface IPatientDataType {
  [PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION]: string;
  [PATIENT_DATA_FI_KEY.BIRTH_DATE]: string;
  [PATIENT_DATA_FI_KEY.FILE_NUMBER]: string;
  [PATIENT_DATA_FI_KEY.NO_FILE]: boolean;
  [PATIENT_DATA_FI_KEY.RAMQ_NUMBER]: string;
  [PATIENT_DATA_FI_KEY.NO_RAMQ]: boolean;
  [PATIENT_DATA_FI_KEY.LAST_NAME]: string;
  [PATIENT_DATA_FI_KEY.FIRST_NAME]: string;
  [PATIENT_DATA_FI_KEY.SEX]: SexValue;
}

const PatientDataSearch = ({
  form,
  parentKey,
  onRamqSearchStateChange,
  onFileSearchStateChange,
  onResetRamq,
  initialFileSearchDone = false,
  initialRamqSearchDone = false,
  initialData,
}: OwnProps) => {
  const formConfig = usePrescriptionFormConfig();
  const [fileSearchDone, setFileSearchDone] = useState(initialFileSearchDone);
  const [ramqSearchDone, setRamqSearchDone] = useState(initialRamqSearchDone);

  const getName = (...key: IGetNamePathParams) => getNamePath(parentKey, key);

  const updateFormFromPatient = (form: FormInstance, patient?: IFormPatient) => {
    if (patient && !isEmpty(patient)) {
      const fields: FieldData[] = [];

      if (patient.ramq) {
        fields.push({
          name: getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER),
          value: formatRamq(patient.ramq),
        });
      }

      if (patient.first_name) {
        fields.push({
          name: getName(PATIENT_DATA_FI_KEY.FIRST_NAME),
          value: patient.first_name,
        });
      }

      if (patient.last_name) {
        fields.push({
          name: getName(PATIENT_DATA_FI_KEY.LAST_NAME),
          value: patient.last_name,
        });
      }

      fields.push(
        {
          name: getName(PATIENT_DATA_FI_KEY.BIRTH_DATE),
          value: patient.birth_date,
        },
        {
          name: getName(PATIENT_DATA_FI_KEY.SEX),
          value: patient?.gender,
        },
      );

      form.setFields(fields);
    }
  };

  useEffect(() => setFileSearchDone(initialFileSearchDone), [initialFileSearchDone]);

  useEffect(() => setRamqSearchDone(initialRamqSearchDone), [initialRamqSearchDone]);

  useEffect(
    () => onRamqSearchStateChange && onRamqSearchStateChange(ramqSearchDone),
    // eslint-disable-next-line
    [ramqSearchDone],
  );

  useEffect(
    () => onFileSearchStateChange && onFileSearchStateChange(fileSearchDone),
    // eslint-disable-next-line
    [fileSearchDone],
  );

  useEffect(() => {
    if (initialData && !isEmpty(initialData)) {
      setFileSearchDone(!!(initialData.no_mrn || initialData.mrn));
      setRamqSearchDone(!!(initialData.no_ramq || initialData.ramq));
      setInitialValues(form, getName, initialData, PATIENT_DATA_FI_KEY);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.patientDataSearchWrapper}>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => (
          <Form.Item
            name={getName(PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION)}
            label="Établissement prescripteur"
            rules={defaultFormItemsRules}
          >
            <Radio.Group
              disabled={
                getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_FILE)) ||
                getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_RAMQ)) ||
                fileSearchDone ||
                ramqSearchDone
              }
            >
              {formConfig?.prescribing_institutions.map((institution) => (
                <Radio key={institution.value} value={institution.value}>
                  {institution.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue(getName(PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION)) ? (
            <SearchOrNoneFormItem<IFormPatient>
              form={form}
              inputFormItemProps={{
                name: getName(PATIENT_DATA_FI_KEY.FILE_NUMBER),
                rules: [
                  {
                    required: true,
                    validateTrigger: 'onSubmit',
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject(new Error('Ce champs est obligatoire'));
                      }

                      if (!fileSearchDone) {
                        return Promise.reject(new Error('Cliquer sur rechercher'));
                      }

                      return Promise.resolve();
                    },
                  },
                ],
                required: true,
                label: 'Dossier',
              }}
              inputProps={{
                placeholder: '000000',
                onSearch: (value, search) => (search as Function)(value.replace(/\s/g, '')),
              }}
              checkboxFormItemProps={{
                name: getName(PATIENT_DATA_FI_KEY.NO_FILE),
                title: 'Aucun numéro de dossier',
              }}
              checkboxProps={{
                onChange: (e) => setFileSearchDone(e.target.checked),
              }}
              onReset={() => {
                setFileSearchDone(false);
                setRamqSearchDone(false);
                form.resetFields([
                  getName(PATIENT_DATA_FI_KEY.FIRST_NAME),
                  getName(PATIENT_DATA_FI_KEY.LAST_NAME),
                  getName(PATIENT_DATA_FI_KEY.SEX),
                  getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER),
                  getName(PATIENT_DATA_FI_KEY.NO_RAMQ),
                  getName(PATIENT_DATA_FI_KEY.NO_FILE),
                  getName(PATIENT_DATA_FI_KEY.BIRTH_DATE),
                ]);
              }}
              onSearchDone={(value) => {
                updateFormFromPatient(form, value);
                setFileSearchDone(true);
                if (value && value.ramq) {
                  setRamqSearchDone(true);
                }
              }}
              apiPromise={(value) =>
                PrescriptionFormApi.searchPatient({
                  ep: getFieldValue(getName(PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION)),
                  mrn: value,
                })
              }
              disabled={
                ramqSearchDone ||
                getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_RAMQ)) ||
                (fileSearchDone && !getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_FILE)))
              }
            />
          ) : null
        }
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_FILE)) || fileSearchDone ? (
            <>
              <SearchOrNoneFormItem<IFormPatient>
                form={form}
                inputFormItemProps={{
                  name: getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER),
                  rules: [
                    {
                      required: true,
                      validateTrigger: 'onSubmit',
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error('Ce champs est obligatoire'));
                        } else if (!isRamqValid(value)) {
                          return Promise.reject(new Error('Le numéro de RAMQ est invalide'));
                        } else if (!ramqSearchDone) {
                          return Promise.reject(new Error('Cliquer sur rechercher'));
                        }

                        return Promise.resolve();
                      },
                    },
                  ],
                  label: 'RAMQ',
                  required: true,
                }}
                checkboxProps={{
                  onChange: (e) => {
                    const checked = e.target.checked;
                    if (!checked) {
                      onResetRamq && onResetRamq();
                    }
                  },
                }}
                inputProps={{
                  placeholder: 'AAAA 0000 0000',
                  onSearch: (value, search) => {
                    resetFieldError(form, getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER));

                    if (isRamqValid(value)) {
                      (search as Function)(value.replace(/\s/g, ''));
                    } else {
                      setFieldError(
                        form,
                        getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER),
                        'Le numéro de RAMQ est invalide',
                      );
                    }
                  },
                  onChange: (event) =>
                    setFieldValue(
                      form,
                      getName(PATIENT_DATA_FI_KEY.RAMQ_NUMBER),
                      formatRamq(event.currentTarget.value),
                    ),
                }}
                checkboxFormItemProps={{
                  name: getName(PATIENT_DATA_FI_KEY.NO_RAMQ),
                  title: 'Aucun numéro de RAMQ ou nouveau-né',
                }}
                onReset={() => {
                  onResetRamq && onResetRamq();
                  setRamqSearchDone(false);
                  form.resetFields([
                    getName(PATIENT_DATA_FI_KEY.FIRST_NAME),
                    getName(PATIENT_DATA_FI_KEY.LAST_NAME),
                    getName(PATIENT_DATA_FI_KEY.SEX),
                    getName(PATIENT_DATA_FI_KEY.NO_RAMQ),
                    getName(PATIENT_DATA_FI_KEY.BIRTH_DATE),
                  ]);
                }}
                onSearchDone={(value) => {
                  updateFormFromPatient(form, value);
                  setRamqSearchDone(true);
                }}
                apiPromise={(value) =>
                  PrescriptionFormApi.searchPatient({
                    ep: getFieldValue(getName(PATIENT_DATA_FI_KEY.PRESCRIBING_INSTITUTION)),
                    ramq: value,
                  })
                }
                disabled={ramqSearchDone && !getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_RAMQ))}
              />
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue(getName(PATIENT_DATA_FI_KEY.NO_RAMQ)) || ramqSearchDone ? (
            <>
              <Form.Item
                name={getName(PATIENT_DATA_FI_KEY.LAST_NAME)}
                label="Nom de famille"
                rules={defaultFormItemsRules}
                wrapperCol={{ span: 10, sm: 12, xxl: 6 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={getName(PATIENT_DATA_FI_KEY.FIRST_NAME)}
                label="Prénom"
                rules={defaultFormItemsRules}
                wrapperCol={{ span: 10, sm: 12, xxl: 6 }}
              >
                <Input />
              </Form.Item>
              <InputDateFormItem
                formItemProps={{
                  label: 'Date de naissance',
                  name: getName(PATIENT_DATA_FI_KEY.BIRTH_DATE),
                  required: true,
                }}
              />
              <Form.Item
                name={getName(PATIENT_DATA_FI_KEY.SEX)}
                label="Sexe"
                rules={defaultFormItemsRules}
                className="noMarginBtm"
              >
                <RadioGroupSex />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
    </div>
  );
};

export default PatientDataSearch;
