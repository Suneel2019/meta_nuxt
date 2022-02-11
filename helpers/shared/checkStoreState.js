import store from '@/store';

function registerStoreModule(modulePath, module) {
    if (store.hasModule(modulePath)) {
        return '';
    }

    store.registerModule(modulePath, module);
}

function unregisterStoreModule(modulePath) {
    if (store.hasModule(modulePath)) {
        store.unregisterModule(modulePath);
    }
}

export {
    registerStoreModule,
    unregisterStoreModule
}
