import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Descriptions } from 'antd';
import { CodeListEntity, ParaclinicEntity } from 'api/fhir/models';
import { HpoApi } from 'api/hpo';
import { IHpoNode } from 'api/hpo/models';
import {
  useCodeSystem,
  useObservationComplexParacliniqueEntity,
  useObservationParacliniqueEntity,
} from 'graphql/prescriptions/actions';
import { find, map, some } from 'lodash';

import { useLang } from 'store/global';

type OwnProps = {
  ids: string[];
  complexIds: string[] | null;
};

const combineValue = (
  paracliniqueValue: ParaclinicEntity,
  complexParacliniqueValue: ParaclinicEntity,
) => {
  const combine = [];
  Array.isArray(paracliniqueValue)
    ? combine.push(...paracliniqueValue)
    : combine.push(paracliniqueValue);
  Array.isArray(complexParacliniqueValue)
    ? combine.push(...complexParacliniqueValue)
    : combine.push(complexParacliniqueValue);
  return combine;
};

const displayComplexParaclinique = (
  value: ParaclinicEntity,
  codeInfo: CodeListEntity,
  lang: string,
  hpoList: IHpoNode[],
) => {
  const codeSystemInfo = find(codeInfo?.concept, (c) => c.code === value?.code);
  const label = find(codeSystemInfo?.designation, (o) => o.language === lang);
  const valueList: string[] = [];
  value.valueCodeableConcept.coding.forEach((v) => {
    const hpo = find(hpoList, (o) => o.hpo_id === v.code);
    hpo ? valueList.push(hpo.name) : null;
  });
  return (
    <Descriptions.Item
      key={value?.id.split('/')[1]}
      label={label ? label.value : codeSystemInfo?.display}
    >
      {`${
        value?.interpretation
          ? intl.get(`screen.prescription.entity.paraclinique.${value.interpretation.coding?.code}`)
          : ''
      }  ${valueList.length > 0 ? `: ${valueList.join(', ')}` : ''}`}
    </Descriptions.Item>
  );
};

const displayParaclinique = (value: ParaclinicEntity, codeInfo: CodeListEntity, lang: string) => {
  const codeSystemInfo = find(codeInfo?.concept, (c) => c.code === value?.code);
  const label = find(codeSystemInfo?.designation, (o) => o.language === lang);
  return (
    <Descriptions.Item
      key={value?.id.split('/')[1]}
      label={label ? label.value : codeSystemInfo?.display}
    >
      {`${
        value?.interpretation
          ? intl.get(`screen.prescription.entity.paraclinique.${value.interpretation.coding?.code}`)
          : ''
      } 
      ${value?.interpretation?.coding?.code === 'A' ? ': ' : ''}
      ${value?.valueString ? `${value?.valueString}` : ''}`}
    </Descriptions.Item>
  );
};

export const Paraclinique = ({ ids, complexIds }: OwnProps) => {
  const { paracliniqueValue } = useObservationParacliniqueEntity(ids);
  const { complexParacliniqueValue } = useObservationComplexParacliniqueEntity(complexIds);
  const { codeInfo } = useCodeSystem('observation-code');
  const [allParacliniqueValue, setAllParacliniqueValue] = useState<any>();
  const [currentHPOOptions, setCurrentHPOOptions] = useState<IHpoNode>();
  const [hpoList, setHpoList] = useState<IHpoNode[]>([]);

  const lang = useLang();
  const handleHpoSearchTermChanged = (term: string) => {
    HpoApi.searchHpos(term.toLowerCase().trim()).then(({ data, error }) => {
      if (!error) {
        const results = map(data?.hits, '_source');
        setCurrentHPOOptions(results[0]);
      }
    });
  };

  useEffect(() => {
    if (paracliniqueValue) {
      complexParacliniqueValue
        ? setAllParacliniqueValue(combineValue(paracliniqueValue, complexParacliniqueValue))
        : setAllParacliniqueValue(paracliniqueValue);
    }
  }, [paracliniqueValue, complexParacliniqueValue]);

  useEffect(() => {
    if (allParacliniqueValue) {
      allParacliniqueValue.forEach((element: any) => {
        if (
          (element?.code === 'BMUS' || element?.code === 'EMG') &&
          element.interpretation.coding.code === 'A'
        ) {
          element.valueCodeableConcept.coding.forEach((c: any) => {
            handleHpoSearchTermChanged(c.code);
          });
        }
      });
    }
  }, [allParacliniqueValue]);

  useEffect(() => {
    if (currentHPOOptions) {
      const isExisting = some(hpoList, currentHPOOptions);
      if (!isExisting) {
        const tempo = [...hpoList, currentHPOOptions];
        setHpoList(tempo);
      }
    }
  }, [currentHPOOptions, hpoList]);

  return (
    <Descriptions column={1} size="small" className="label-20">
      {allParacliniqueValue?.map((p: ParaclinicEntity) => {
        if ((p?.code === 'BMUS' || p?.code === 'EMG') && p.interpretation.coding.code === 'A') {
          return displayComplexParaclinique(p, codeInfo, lang, hpoList);
        }
        return displayParaclinique(p, codeInfo, lang);
      })}
    </Descriptions>
  );
};
