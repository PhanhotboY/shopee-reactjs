import { ROLES, LANGUAGES, GENDERS } from 'utils';

const roleMenus = [
    {
        name: 'common.all',
        value: 'all',
    },
];
for (let key of Object.keys(ROLES)) {
    roleMenus.push({
        name: `common.${key.toLowerCase()}`,
        value: key.toLowerCase(),
    });
}

const genderMenus = [
    {
        name: 'common.all',
        value: 'all',
    },
];
for (let key of Object.keys(GENDERS)) {
    genderMenus.push({
        name: `common.${key.toLowerCase()}`,
        value: key.toLowerCase(),
    });
}

export const userFilterMenu = [
    {
        label: 'signup.roleId',
        name: 'role',
        menus: roleMenus,
    },
    {
        label: 'signup.gender',
        name: 'gender',
        menus: genderMenus,
    },
];
