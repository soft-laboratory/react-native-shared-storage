#import "SharedStorage.h"

@implementation SharedStorage
  NSUserDefaults *mySharedDefaults;
  NSString *appGroupName = @"";

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getItem: (NSString *)key :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback)
{
   if (![appGroup isEqualToString:appGroupName]) {
     mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
   }

   if (mySharedDefaults == nil) {
     // error code 0 == no user defaults with that suite name available
     callback(@[@0]);
     return;
   }

   if ([mySharedDefaults valueForKey:key] == nil) {
     // error code 1 == suite has no value for that key
     callback(@[@1]);
     return;
   }

   callback(@[[NSNull null], [mySharedDefaults valueForKey:key]]);
}

RCT_EXPORT_METHOD(setItem: (NSString *)key :(NSString *)value :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback)
{
   if (![appGroup isEqualToString:appGroupName]) {
     appGroupName = appGroup;
     mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
   }

   if (mySharedDefaults == nil) {
     // error code 0 == no user defaults with that suite name available
     callback(@[@0]);
     return;
   }

   [mySharedDefaults setValue:value forKey:key];
   callback(@[[NSNull null]]);
}

RCT_EXPORT_METHOD(removeItem: (NSString *)key :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback)
{
   if (![appGroup isEqualToString:appGroupName]) {
      appGroupName = appGroup;
      mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
   }

   if (mySharedDefaults == nil) {
      // error code 0 == no user defaults with that suite name available
      callback(@[@0]);
      return;
   }

   [mySharedDefaults removeObjectForKey:key];
   callback(@[[NSNull null]]);
}


@end
