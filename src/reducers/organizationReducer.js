import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function organizationReducer(state = initialState.organization, action) {
  switch (action.type) {
    case types.LOAD_ORGANIZATION_SUCCESS:
      return action.organization;
    default:
      return state;
  }
}

export default function organizationsReducer(state = initialState.organizations, action) {
  switch (action.type) {
    case types.LOAD_ORGANIZATIONS_SUCCESS:
      return action.organizations;

    case types.CREATE_ORGANIZATION_SUCCESS:
      browserHistory.push(`/organizations/${action.organization.id}`);
      return [
        ...state.filter(organization => organization.id !== action.organization.id),
        Object.assign({}, action.organization),
      ];

    case types.UPDATE_ORGANIZATION_SUCCESS:
      return [
        ...state.filter(organization => organization.id !== action.organization.id),
        Object.assign({}, action.organization),
      ];

    case types.DELETE_ORGANIZATION_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfOrganizationToDelete = state.findIndex(organization => organization.id === action.organization.id);
      newState.splice(indexOfOrganizationToDelete, 1);
      browserHistory.push('/organizations');
      return newState;
    }

    default:
      return state;
  }
}
