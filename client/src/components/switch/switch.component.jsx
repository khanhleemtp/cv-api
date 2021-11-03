import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SwitchInput() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full`}
      />
    </Switch>
  );
}
