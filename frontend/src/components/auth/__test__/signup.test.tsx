import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Signup from '../signup';

describe('IProps', () => {

  // Function sets isOpen to true when setIsOpen is called with true
  it('should set isOpen to true when setIsOpen is called with true', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const steps = [];
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      steps,
      templateData,
    };

    // Call the function
    props.setIsOpen(true);

    // Assertion
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });

  // Function sets isOpen to false when setIsOpen is called with false
  it('should set isOpen to false when setIsOpen is called with false', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const steps = [];
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      steps,
      templateData,
    };

    // Call the function
    props.setIsOpen(false);

    // Assertion
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // Function sets selectedStep to the provided number when setSelectedStep is called
  it('should set selectedStep to the provided number when setSelectedStep is called', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const steps = [];
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      steps,
      templateData,
    };

    // Call the function
    props.setSelectedStep(2);

    // Assertion
    expect(setSelectedStep).toHaveBeenCalledWith(2);
  });

  // setIsOpen is not called with a boolean value
  it('should not call setIsOpen when called with a non-boolean value', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const steps = [];
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      steps,
      templateData,
    };

    // Call the function with a non-boolean value
    props.setIsOpen(123);

    // Assertion
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  // setSelectedStep is not called with a number value
  it('should not call setSelectedStep when called with a non-number value', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const steps = [];
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      steps,
      templateData,
    };

    // Call the function with a non-number value
    props.setSelectedStep("2");

    // Assertion
    expect(setSelectedStep).not.toHaveBeenCalled();
  });

  // steps prop is not provided
  it('should not call setSelectedStep when steps prop is not provided', () => {
    const setIsOpen = jest.fn();
    const setSelectedStep = jest.fn();
    const templateData = {
      StringMap: [],
      IntMap: [],
      FloatMap: [],
      Data: {},
      CSRFToken: "",
      Flash: "",
      Warning: "",
      Error: "",
      Form: {},
      IsAuthenticated: 0,
    };

    const props: IProps = {
      setIsOpen,
      setSelectedStep,
      templateData,
    };

    // Call the function
    props.setSelectedStep(2);

    // Assertion
    expect(setSelectedStep).not.toHaveBeenCalled();
  });
});