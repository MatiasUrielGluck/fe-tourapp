import { Component } from 'vue';

type KycStepType = {
  name: number;
  title: string;
  icon: string;
  done?: boolean;
  component: Component;
  show: boolean;
};

export default KycStepType;
